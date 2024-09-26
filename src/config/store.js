import { configureStore } from '@reduxjs/toolkit'
import ipoReducer from '../features/api/ipoSlice'

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    ipo: ipoReducer
  },
})