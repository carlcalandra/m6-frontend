import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SignupForm from "../../components/signup/SignupForm";
import "./signup.css";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addErrorToast } from "../../store/toastSlicer";
import { nanoid } from "nanoid";

const Signup = () => {
  const [params, _] = useSearchParams();
  const [isSet, setIsSet] = useState(false);
  const message = params.get("message") || null;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSet && message) {
      dispatch(
        addErrorToast({
          id: nanoid(),
          color: "danger",
          title: message,
          content: message,
        })
      );
    }
    setIsSet(true);
  }, [message, isSet]);
  return (
    <Container className="signup-container flex-column align-items-center justify-content-center d-flex">
      <h2>Sign to Epiblog</h2>
      <SignupForm />
      <small>
        Signed in, <Link to={"/login"}>login</Link>
      </small>
    </Container>
  );
};

export default Signup;
