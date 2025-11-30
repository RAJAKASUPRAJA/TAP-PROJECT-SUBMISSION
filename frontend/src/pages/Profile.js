import React from 'react';
import { useSelector } from 'react-redux';
export default function Profile(){
  const user = useSelector(s=>s.auth.user);
  return (
    <div>
      <h2>My Profile</h2>
      <div className="card">
        <strong>{user?.name||'Your Name'}</strong><br/>
        {user?.employeeId} • {user?.department}
      </div>
    </div>
  );
}
