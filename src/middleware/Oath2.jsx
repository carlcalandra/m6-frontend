import axios from "../api/api";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addErrorToast } from "../store/toastSlicer";
import createToast from "../utils/toast";
import { setUser } from "../store/userSlicer";

const Oath2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getToken = async () => {
    try {
      const response = await axios.get("/auth/connectedUser", {
        withCredentials: true,
      });
      const {token} = response.data
      dispatch(setUser(token))
      navigate("/")
    } catch (error) {
      dispatch(addErrorToast(createToast(error)));
      navigate("/login");
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return <></>;
};

export default Oath2;
