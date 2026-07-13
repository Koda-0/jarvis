import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '../../services/projectService';

export const fetchProjects = createAsyncThunk('projects/fetch', async (_, { rejectWithValue }) => {
  try { const { data } = await getProjects(); return data.data ?? []; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

const s = createSlice({
  name: 'projects',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProjects.pending,   (s) => { s.loading = true;  s.error = null; });
    b.addCase(fetchProjects.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; });
    b.addCase(fetchProjects.rejected,  (s, { payload }) => { s.loading = false; s.error = payload; });
  },
});
export default s.reducer;
