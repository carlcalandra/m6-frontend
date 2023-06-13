import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteToast } from "../../store/toastSlicer";

const BlogToast = ({ toast, deleteToast }) => {
  const [show, setShow] = useState(true);
  const [time, setTime] = useState(0);
  const timeInterval = 30;
  let message;
  if (time <= timeInterval) {
    message = "just now";
  } else if (time >= timeInterval && time <= timeInterval * 2) {
    message = `${timeInterval} seconds ago`;
  } else {
    message = `${Math.floor((time / timeInterval) * 2)} minutes ago`;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + timeInterval);
    }, timeInterval * 1000);
    return () => {clearInterval(interval)};
  }, []);
  const handleClose = () => {
    setShow(false);
    deleteToast();
  };
  return (
    <Toast show={show} onClose={handleClose}>
      <Toast.Header>
        <div className={`p-2 bg-${toast.color} rounded me-2`}></div>
        <strong className="me-auto">{toast.title}</strong>
        <small className="text-muted">{message}</small>
      </Toast.Header>
      <Toast.Body>{toast.content}</Toast.Body>
    </Toast>
  );
};

export default BlogToast;
