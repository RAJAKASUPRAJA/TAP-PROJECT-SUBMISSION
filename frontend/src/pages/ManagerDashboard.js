import React, { useEffect, useState } from 'react';
import api from '../api';
export default function ManagerDashboard(){
  const [data,setData]=useState(null);
  useEffect(()=>{ api.get('/dashboard/manager').then(r=>setData(r.data)); },[]);
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <div className="grid4">
        <div className="card">Total Employees<br/><strong>{data?.totalEmployees||0}</strong></div>
        <div className="card">Present Today<br/><strong>{data?.present||0}</strong></div>
        <div className="card">Absent Today<br/><strong>{data?.absent||0}</strong></div>
        <div className="card">Late Today<br/><strong>{data?.lateToday||0}</strong></div>
      </div>
      <div className="card">Charts placeholders</div>
      <div className="card">Absent employees list</div>
    </div>
  );
}
