import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
export const fetchMyHistory = createAsyncThunk('attendance/history', async ()=> {
  const res = await api.get('/attendance/my-history'); return res.data.list;
});
export const checkIn = createAsyncThunk('attendance/checkin', async ()=> { const res = await api.post('/attendance/checkin'); return res.data.attendance; });
export const checkOut = createAsyncThunk('attendance/checkout', async ()=> { const res = await api.post('/attendance/checkout'); return res.data.attendance; });
const slice = createSlice({ name:'attendance', initialState:{ history:[], today:null }, reducers:{}, extraReducers: builder => {
  builder.addCase(fetchMyHistory.fulfilled,(s,act)=>{ s.history=act.payload; });
  builder.addCase(checkIn.fulfilled,(s,act)=>{ s.today=act.payload; });
  builder.addCase(checkOut.fulfilled,(s,act)=>{ s.today=act.payload; });
}});
export default slice.reducer;
