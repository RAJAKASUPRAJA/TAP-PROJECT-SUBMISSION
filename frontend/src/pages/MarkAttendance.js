import React from 'react';
import { useDispatch } from 'react-redux';
import { checkIn, checkOut } from '../redux/slices/attendanceSlice';
export default function MarkAttendance(){
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Mark Attendance</h2>
      <div className="card" style={{textAlign:'center'}}>
        <div style={{fontSize:32}}>🕒</div>
        <div style={{marginTop:8}}>--:--:--</div>
        <div style={{marginTop:8}}>Saturday, November 29, 2025</div>
      </div>
      <div className="card" style={{textAlign:'center'}}>
        <button className="btn" onClick={()=>dispatch(checkIn())}>Check In</button>
        <span style={{marginLeft:12}} />
        <button className="btn" onClick={()=>dispatch(checkOut())}>Check Out</button>
      </div>
    </div>
  );
}
