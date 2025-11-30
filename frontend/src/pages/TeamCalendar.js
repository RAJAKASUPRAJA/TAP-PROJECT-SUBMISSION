import React, { useEffect, useState } from 'react';
import api from '../api';
export default function TeamCalendar(){
  const [days,setDays] = useState({});
  useEffect(()=>{ api.get('/attendance/calendar').then(r=>setDays(r.data.days||{})); },[]);
  return (
    <div>
      <h2>Team Calendar View</h2>
      <div className="card">
        <div style={{display:'flex',flexWrap:'wrap',gap:12}}>
          {Array.from({length:30}).map((_,i)=> {
            const d = i+1; const s = days[d]?.status;
            const bg = s==='absent'?'#f87171': s==='late'?'#facc15': s==='present'?'#bbf7d0':'#fdedd5';
            return (<div key={d} style={{width:120,height:100,background:bg,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8}}>{d}</div>);
          })}
        </div>
      </div>
    </div>
  );
}
