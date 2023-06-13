import { configureStore } from '@reduxjs/toolkit'
import userSlicer from './userSlicer'
import toastSlicer from './toastSlicer';
import loaderSlicer from './loaderSlicer';

export const store = configureStore({
  reducer: {
    user:userSlicer,
    toasts:toastSlicer,
    loader:loaderSlicer
  },
})

export default store;