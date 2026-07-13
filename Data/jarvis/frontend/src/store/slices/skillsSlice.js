import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSkills } from '../../services/skillService';

export const fetchSkills = createAsyncThunk('skills/fetch', async (_, { rejectWithValue }) => {
  try { const { data } = await getSkills(); return data.data ?? []; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

const s = createSlice({
  name: 'skills',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSkills.pending,   (s) => { s.loading = true;  s.error = null; });
    b.addCase(fetchSkills.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; });
    b.addCase(fetchSkills.rejected,  (s, { payload }) => { s.loading = false; s.error = payload; });
  },
});
export default s.reducer;
