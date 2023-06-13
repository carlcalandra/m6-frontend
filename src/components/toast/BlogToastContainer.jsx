import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import BlogToast from './BlogToast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteToast } from '../../store/toastSlicer'

const BlogToastContainer = () => {
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(deleteToast(id))
  }
  const toasts = useSelector(state => state.toasts.elements); 
  const blogtoasts = toasts.map(toast => <BlogToast toast={toast} key={toast.id} deleteToast={()=> {handleDelete(toast.id)}} />)  
  return (
    <ToastContainer position='bottom-end' className='my-2' containerPosition='fixed' >
        {blogtoasts}
    </ToastContainer>
  )
}

export default BlogToastContainer