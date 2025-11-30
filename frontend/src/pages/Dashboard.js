import React, { useEffect, useState } from 'react';
import api from '../api';
export default function Dashboard(){
  const [data,setData]=useState(null);
  useEffect(()=>{ api.get('/dashboard/employee').then(r=>setData(r.data)); },[]);
  return (
    <div>
      <h2>Welcome back</h2>
      <div className="banner card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:18}}>Current Time</div>
            <div style={{fontSize:20,marginTop:6}}>--:--:--</div>
          </div>
          <div>
            <button className="btn">Check In</button>
          </div>
        </div>
      </div>
      <div className="grid4">
        <div className="card">Present Days<br/><strong>0</strong></div>
        <div className="card">Absent Days<br/><strong>0</strong></div>
        <div className="card">Late Days<br/><strong>0</strong></div>
        <div className="card">Total Hours<br/><strong>0h</strong></div>
      </div>
      <div className="card">Recent Attendance (placeholder)</div>
    </div>
  );
}
