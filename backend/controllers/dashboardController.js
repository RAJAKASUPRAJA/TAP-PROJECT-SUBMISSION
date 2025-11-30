const Attendance = require('../models/Attendance');
const User = require('../models/User');
const todayDate = ()=> new Date().toISOString().slice(0,10);

exports.employeeDashboard = async (req,res)=>{
  try{
    const user = req.user; const today = todayDate();
    const todayRec = await Attendance.findOne({ userId:user._id, date:today });
    const status = todayRec ? (todayRec.checkInTime ? 'Checked In' : 'Not Checked In') : 'Not Checked In';
    const prefix = new Date().toISOString().slice(0,7);
    const att = await Attendance.find({ userId: user._id, date: { $regex: `^${prefix}` } });
    const summary = { present:0, absent:0, late:0, halfDay:0, totalHours:0 };
    att.forEach(a=>{ if(a.status==='present') summary.present++; if(a.status==='absent') summary.absent++; if(a.status==='late') summary.late++; if(a.status==='half-day') summary.halfDay++; summary.totalHours += (a.totalHours||0); });
    const recent = await Attendance.find({ userId:user._id }).sort({ date:-1 }).limit(7);
    res.json({ status, summary, recent });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.managerDashboard = async (req,res)=>{
  try{
    const totalEmployees = await User.countDocuments({ role:'employee' });
    const today = todayDate();
    const presentDocs = await Attendance.find({ date:today, checkInTime: { $exists:true } }).populate('userId','name employeeId department');
    const present = new Set(presentDocs.map(p=>String(p.userId._id))).size;
    const absent = totalEmployees - present;
    const lateCount = await Attendance.countDocuments({ date:today, status:'late' });

    // weekly trend
    const weekly = [];
    for(let i=6;i>=0;i--){
      const d = new Date(); d.setDate(d.getDate()-i); const key = d.toISOString().slice(0,10);
      const presentCount = await Attendance.countDocuments({ date: key, checkInTime: { $exists:true } });
      const late = await Attendance.countDocuments({ date: key, status: 'late' });
      const absentCount = totalEmployees - presentCount;
      weekly.push({ date: key, present: presentCount, late, absent: absentCount });
    }

    // department agg
    const deptAgg = await Attendance.aggregate([
      { $match: { date: today } },
      { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'u' } },
      { $unwind: '$u' },
      { $group: { _id: '$u.department', present: { $sum: { $cond: [ { $gt: ['$checkInTime', null] }, 1, 0 ] } } } }
    ]);

    const allEmployees = await User.find({ role:'employee' }).select('_id name employeeId department');
    const presentIds = presentDocs.map(p=>String(p.userId._id));
    const absentList = allEmployees.filter(e=> !presentIds.includes(String(e._id)));

    res.json({ totalEmployees, present, absent, lateToday: lateCount, weekly, departmentAgg: deptAgg, absentList });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};
