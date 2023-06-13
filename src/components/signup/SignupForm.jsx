import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addErrorToast } from "../../store/toastSlicer";
import createToast from "../../utils/toast";
import { activateLoader, deactivateLoader } from "../../store/loaderSlicer";
const SignupForm = () => {
  const initialFormData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [avatarImg, setAvatarImg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(activateLoader());
      const response = await axios.post("/auth/signup", formData);
      if (avatarImg) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatarImg", avatarImg);
        await axios.patch(`/auth/${response.data._id}/avatar`, avatarFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      dispatch(deactivateLoader());
      navigate("/login");
    } catch (error) {
      const { errors } = error.response.data;
      const errorsArr = errors.map((e) => ({
        message:error.message,
        response:{
            data:{
                message:e.message
            }
        }
      }));
      errorsArr.forEach((error) => {
        dispatch(addErrorToast(createToast(error)));
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row xs={2} md={3}>
        <Col>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type={"email"}
              required
              name={"email"}
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={"password"}
              required
              name={"password"}
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type={"text"}
              required
              name={"firstName"}
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type={"text"}
              required
              name={"lastName"}
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type={"date"}
              required
              name={"dateOfBirth"}
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type={"file"}
              accept=".jpg, .jpeg, .png"
              multiple={false}
              onChange={(e) => {
                setAvatarImg(e.target.files[0]);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="d-flex justify-content-center">
        <Button type="subimit" className="my-3">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default SignupForm;
