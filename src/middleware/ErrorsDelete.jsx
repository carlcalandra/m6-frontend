import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom'
import { deleteToasts } from '../store/toastSlicer';

const ErrorsDelete = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(deleteToasts())
  },[pathname])
  return (
    <Outlet/>
  )
}

export default ErrorsDelete