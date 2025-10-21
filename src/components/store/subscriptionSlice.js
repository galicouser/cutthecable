import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubscriptionPackages = createAsyncThunk(
  'subscription/fetchSubscriptionPackages',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axios.get()
    } catch (err) {
      console.error(err)
    }
  }
)

export const fetchSubscriptionPackage = createAsyncThunk(
  'subscrption/fetchSubscriptionPackage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('');

      if (response.status !== 200) {
        throw new Error('Failed to fetch subscription packages');
      }

      const { data } = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    plans: [],
    selectedPlan: null,
    subscriptionLength: '',
    numberDevices: 1,
    loading: false,
    error: null,
  },
  reducers: {
    selectSubscriptionPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    setSubscriptionLength: (state, action) => {
      state.subscriptionLength = action.payload;
    },
    setNumberDevices: (state, action) => {
      state.numberDevices = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchSubscriptionPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load subscription packages';
      });
  }
});

export const { selectSubscriptionPlan, setSubscriptionLength, setNumberDevices } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;