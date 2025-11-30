import React, { useEffect, useState } from 'react';
import api from '../api';
export default function AllAttendance(){
  const [list,setList]=useState([]);
  useEffect(()=>{ api.get('/attendance/all').then(r=>setList(r.data.list)); },[]);
  return (
    <div>
      <h2>All Employees Attendance</h2>
      <div className="card">
        <table style={{width:'100%'}}><thead><tr><th>Employee</th><th>EmpID</th><th>Dept</th><th>Date</th><th>CheckIn</th><th>CheckOut</th><th>Status</th></tr></thead>
        <tbody>{list.map(l=> <tr key={l._id}><td>{l.userId?.name}</td><td>{l.userId?.employeeId}</td><td>{l.userId?.department}</td><td>{l.date}</td><td>{l.checkInTime||'-'}</td><td>{l.checkOutTime||'-'}</td><td>{l.status}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
