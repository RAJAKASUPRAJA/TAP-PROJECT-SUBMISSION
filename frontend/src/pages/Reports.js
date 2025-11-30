import React, { useState, useEffect } from 'react';
import api from '../api';
export default function Reports(){
  const [summary,setSummary] = useState(null);
  useEffect(()=>{ /* could call summary endpoints */ },[]);
  return (
    <div>
      <h2>Reports</h2>
      <div className="card">Filters and Export CSV placeholder</div>
    </div>
  );
}
