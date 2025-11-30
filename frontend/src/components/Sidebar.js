import React from 'react';
import { Link } from 'react-router-dom';
export default function Sidebar(){
  return (
    <div className="sidebar">
      <h3>Attendance System</h3>
      <p style={{color:'#666'}}>Demo App</p>
      <nav>
        <ul style={{listStyle:'none',padding:0}}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/mark">Mark Attendance</Link></li>
          <li><Link to="/history">My History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li style={{marginTop:10}}><Link to="/all-attendance">All Attendance</Link></li>
          <li><Link to="/team-calendar">Team Calendar</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
      </nav>
    </div>
  );
}
