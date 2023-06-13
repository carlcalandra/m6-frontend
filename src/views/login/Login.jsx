import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../../components/login/LoginForm";
import "./login.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlicer";
import axios from "../../api/api"
import { addErrorToast } from "../../store/toastSlicer";
import createToast from "../../utils/toast";
import { activateLoader, deactivateLoader } from "../../store/loaderSlicer";

const Login = () => {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(activateLoader())
      const response = await axios.post("/auth/login", formData);
      const {token} = response.data;
      dispatch(setUser(token)); 
      navigate("/")
    } catch (error) {
      dispatch(addErrorToast(createToast(error)));
    }
    dispatch(deactivateLoader())
  };


  return (
    <Container className="d-flex flex-column justify-content-center align-items-center login-container position-relative">
      <h2>Login to Epiblog</h2>
      <div className="my-3">
        <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </div>
      <p>Don't have and account?<Link to={"/signup"}>Sign up here</Link></p>
    </Container>
  );
};

export default Login;
