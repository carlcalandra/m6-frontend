import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import "./style.css"

const Loader = () => {
  useEffect(()=>{
    document.body.style.overflowY  = "hidden";
    return () => {document.body.style.overflowY = "auto"}
  },[])
  return (
    <div className='position-fixed top-0 start-0 vh-100 vw-100 overlay d-flex justify-content-center align-items-center'>
        <Spinner variant='primary' size='lg'/>
    </div>
  )
}

export default Loader