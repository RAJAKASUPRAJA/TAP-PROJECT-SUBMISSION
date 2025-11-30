import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyHistory } from '../redux/slices/attendanceSlice';
export default function MyHistory(){
  const dispatch = useDispatch();
  const history = useSelector(s=>s.attendance.history);
  useEffect(()=>{ dispatch(fetchMyHistory()); },[]);
  return (
    <div>
      <h2>My Attendance History</h2>
      <div className="card">
        <div>Calendar/Table toggle (placeholder)</div>
      </div>
      <div className="card">
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr><th>Date</th><th>Check In</th><th>Check Out</th><th>Status</th></tr></thead>
          <tbody>
            {history.map(r=> <tr key={r._id}><td>{r.date}</td><td>{r.checkInTime||'-'}</td><td>{r.checkOutTime||'-'}</td><td>{r.status}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
