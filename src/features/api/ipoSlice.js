import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchIpoList, fetchIpoById } from './network'; 

const initialState = {
  ipoList: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  ipoById: {
    data: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
};

const ipoSlice = createSlice({
  name: "ipo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // IPO List Reducers
    builder
      .addCase(fetchIpoList.pending, (state) => {
        state.ipoList.status = "loading";
      })
      .addCase(fetchIpoList.fulfilled, (state, action) => {
        state.ipoList.status = "succeeded";
        state.ipoList.data = action.payload;
      })
      .addCase(fetchIpoList.rejected, (state, action) => {
        state.ipoList.status = "failed";
        state.ipoList.error = action.error.message;
        throw new Error(action.error.message);
      });

    // IPO By ID Reducers
    builder
      .addCase(fetchIpoById.pending, (state) => {
        state.ipoById.status = "loading";
      })
      .addCase(fetchIpoById.fulfilled, (state, action) => {
        state.ipoById.status = "succeeded";
        state.ipoById.data = action.payload;
      })
      .addCase(fetchIpoById.rejected, (state, action) => {
        state.ipoById.status = "failed";
        state.ipoById.error = action.error.message;
        throw new Error(action.error.message);
      });
  },
});

// IPO List Selectors
export const selectIpoList = (state) => state.ipo.ipoList.data;
export const selectIpoListStatus = (state) => state.ipo.ipoList.status;
export const selectIpoListError = (state) => state.ipo.ipoList.error;

export const selectIpoFromListById = createSelector(
    [selectIpoList, (state, ipoId) => ipoId],
    (ipoList, ipoId) => ipoList.find(ipo => ipo.id === ipoId)
  );

// IPO By ID Selectors
export const selectIpoById = (state) => state.ipo.ipoById.data;
export const selectIpoByIdStatus = (state) => state.ipo.ipoById.status;
export const selectIpoByIdError = (state) => state.ipo.ipoById.error;

export default ipoSlice.reducer;
