import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/userSlicer";
import { addErrorToast } from "../store/toastSlicer";
import createToast from "../utils/toast";
import { activateLoader, deactivateLoader } from "../store/loaderSlicer";


const AxiosInterceptor = () => {
  const location = useLocation();
  const [isSet, setIsSet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = (config) => {
      const token = localStorage.getItem("auth") || null;
      if (token) {
        config.headers["Authorization"] = token;
      } else {
        delete config.headers["Authorization"];
      }
      return config;
    };
    const reqErrorInterceptor = (error) => {
      return Promise.reject(error);
    };
    const resInterceptor = (response) => {
      return response;
    };
    const errInteceptor = (error) => {
      if (error.response.status === 401) {
        dispatch(logOut());
        dispatch(addErrorToast(createToast(error)));
        navigate("/login");
      }
      return Promise.reject(error);
    };
    const useResInterceptor = axios.interceptors.response.use(
      resInterceptor,
      errInteceptor
    );
    const useReqInterceptor = axios.interceptors.request.use(
      reqInterceptor,
      reqErrorInterceptor
    );
    setIsSet(true);
    return () => {
      axios.interceptors.response.eject(useResInterceptor);
      axios.interceptors.request.eject(useReqInterceptor);
    };
  }, []);
  return <>{isSet && <Outlet />}</>;
};

export default AxiosInterceptor;
