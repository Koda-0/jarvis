import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBlogs } from '../../services/blogService';

export const fetchBlogs = createAsyncThunk('blogs/fetch', async (_, { rejectWithValue }) => {
  try { const { data } = await getBlogs(); return data.data ?? []; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

const s = createSlice({
  name: 'blogs',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchBlogs.pending,   (s) => { s.loading = true;  s.error = null; });
    b.addCase(fetchBlogs.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; });
    b.addCase(fetchBlogs.rejected,  (s, { payload }) => { s.loading = false; s.error = payload; });
  },
});
export default s.reducer;
