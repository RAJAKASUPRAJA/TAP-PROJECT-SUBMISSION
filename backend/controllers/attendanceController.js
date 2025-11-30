const Attendance = require('../models/Attendance');
const User = require('../models/User');
const todayDate = ()=> new Date().toISOString().slice(0,10);
const hoursBetweenISO = (a,b)=> { if(!a||!b) return 0; return Math.round((new Date(b)-new Date(a))/36e5*100)/100; };

exports.checkIn = async (req,res)=>{
  try{
    const user=req.user; const date=todayDate();
    let att = await Attendance.findOne({ userId:user._id, date });
    if(att && att.checkInTime) return res.status(400).json({ message:'Already checked in' });
    const now = new Date().toISOString();
    if(!att) att = new Attendance({ userId:user._id, date });
    att.checkInTime = now;
    // late after 09:30
    const lateCut = new Date(); lateCut.setHours(9,30,0,0);
    att.status = new Date() > lateCut ? 'late' : 'present';
    await att.save();
    res.json({ attendance:att });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.checkOut = async (req,res)=>{
  try{
    const user=req.user; const date=todayDate();
    const att = await Attendance.findOne({ userId:user._id, date });
    if(!att || !att.checkInTime) return res.status(400).json({ message:'No check-in' });
    if(att.checkOutTime) return res.status(400).json({ message:'Already checked out' });
    att.checkOutTime = new Date().toISOString();
    att.totalHours = hoursBetweenISO(att.checkInTime, att.checkOutTime);
    if(att.totalHours>0 && att.totalHours<4) att.status='half-day';
    await att.save();
    res.json({ attendance:att });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.myHistory = async (req,res)=>{
  try{
    const user=req.user;
    const list = await Attendance.find({ userId:user._id }).sort({ date:-1 });
    res.json({ list });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.mySummary = async (req,res)=>{
  try{
    const user=req.user;
    const prefix = new Date().toISOString().slice(0,7);
    const att = await Attendance.find({ userId:user._id, date: { $regex: `^${prefix}` } });
    const summary = { present:0, absent:0, late:0, 'half-day':0, totalHours:0 };
    att.forEach(a=>{ summary[a.status] = (summary[a.status]||0)+1; summary.totalHours += (a.totalHours||0); });
    res.json({ summary });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.today = async (req,res)=>{
  try{
    const user=req.user; const date=todayDate();
    if(user.role==='manager'){
      const list = await Attendance.find({ date }).populate('userId','name employeeId department');
      return res.json({ list });
    }
    const att = await Attendance.findOne({ userId:user._id, date });
    res.json({ attendance:att });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.getAll = async (req,res)=>{
  try{
    const { employeeId, status, from, to, department } = req.query;
    const match = {};
    if(from && to) match.date = { $gte: from, $lte: to };
    if(status) match.status = status;
    if(employeeId){
      const u = await User.findOne({ employeeId });
      if(u) match.userId = u._id;
    }
    if(department){
      const users = await User.find({ department }).select('_id');
      match.userId = { $in: users.map(x=>x._id) };
    }
    const list = await Attendance.find(match).populate('userId','name employeeId department').sort({ date:-1 });
    res.json({ list });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.calendarForUser = async (req,res)=>{
  try{
    const user=req.user;
    const { month, year, userId } = req.query;
    const m = month || (new Date().getMonth()+1);
    const y = year || new Date().getFullYear();
    const prefix = `${y}-${String(m).padStart(2,'0')}`;
    const id = (user.role==='manager' && userId) ? userId : user._id;
    const att = await Attendance.find({ date: { $regex: `^${prefix}` }, userId: id });
    const map = {};
    att.forEach(a=>{ const day = Number(a.date.split('-')[2]); map[day] = { status: a.status, checkIn: a.checkInTime, checkOut: a.checkOutTime, totalHours: a.totalHours }; });
    res.json({ month: prefix, days: map });
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};
