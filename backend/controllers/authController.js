const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res)=>{
  try{
    const { name,email,password,role,department } = req.body;
    if(!name||!email||!password) return res.status(400).json({ message:'Missing fields' });
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ message:'Email exists' });
    const empCount = await User.countDocuments();
    const employeeId = 'EMP' + String(empCount+1).padStart(3,'0');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    user = await User.create({ name,email,password:hash,role,department,employeeId });
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET || 'secret',{ expiresIn:'7d' });
    res.json({ token, user:{ id:user._id,name:user.name,email:user.email,role:user.role,employeeId:user.employeeId,department:user.department }});
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.login = async (req,res)=>{
  try{
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message:'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ message:'Invalid credentials' });
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET || 'secret',{ expiresIn:'7d' });
    res.json({ token, user:{ id:user._id,name:user.name,email:user.email,role:user.role,employeeId:user.employeeId,department:user.department }});
  }catch(err){ console.error(err); res.status(500).json({ message:'Server error' }) }
};

exports.me = async (req,res)=>{
  res.json({ user: req.user });
};
