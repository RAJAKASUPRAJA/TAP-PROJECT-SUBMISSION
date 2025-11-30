import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
export const login = createAsyncThunk('auth/login', async (cred, thunkAPI)=>{
  const res = await api.post('/auth/login', cred);
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});
export const register = createAsyncThunk('auth/register', async (data)=>{
  const res = await api.post('/auth/register', data);
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});
const slice = createSlice({
  name:'auth', initialState:{ user:null, loading:false }, reducers:{ logout:(s)=>{ s.user=null; localStorage.removeItem('token'); } },
  extraReducers: builder => {
    builder.addCase(login.fulfilled,(s,act)=>{ s.user=act.payload; });
    builder.addCase(register.fulfilled,(s,act)=>{ s.user=act.payload; });
  }
});
export const { logout } = slice.actions; export default slice.reducer;
