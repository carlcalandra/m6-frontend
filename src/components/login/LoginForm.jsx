import React from 'react'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({formData, handleChange, handleSubmit}) => {
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control required type={"email"} name={"email"} onChange={handleChange} value={formData.email}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control required type={"password"} name={"password"} onChange={handleChange} value={formData.password}/>
        </Form.Group>
        <div className='d-flex justify-content-center align-items-center flex-column'>
        <Button variant='primary' type={"submit"} className='my-3'>Login</Button>
        <Button variant='dark' as='a' href={process.env.REACT_APP_BACKEND_SERVER + "/oath2/github"} className='my-3'>Login with github</Button>
        </div>
    </Form>
  )
}

export default LoginForm