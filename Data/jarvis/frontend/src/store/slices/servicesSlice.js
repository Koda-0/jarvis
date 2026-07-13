import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getServices } from '../../services/serviceService';

export const fetchServices = createAsyncThunk('services/fetch', async (_, { rejectWithValue }) => {
  try { const { data } = await getServices(); return data.data ?? []; }
  catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed'); }
});

const s = createSlice({
  name: 'services',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchServices.pending,   (s) => { s.loading = true;  s.error = null; });
    b.addCase(fetchServices.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload; });
    b.addCase(fetchServices.rejected,  (s, { payload }) => { s.loading = false; s.error = payload; });
  },
});
export default s.reducer;
