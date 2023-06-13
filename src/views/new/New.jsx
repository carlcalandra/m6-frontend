import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import axios from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { addErrorToast } from "../../store/toastSlicer";
import createToast from "../../utils/toast";
import { activateLoader, deactivateLoader } from "../../store/loaderSlicer";

const NewBlogPost = (props) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const initialState = {
    title: "",
    content: null,
    category: "",
    author: { email: email },
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [formData, setFormData] = useState(initialState);

  const [coverImg, setCoverImg] = useState(null);

  const submitImg = async (postId, data) => {
    const response = await axios.patch(`/posts/${postId}/cover`, data, {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    return response.data;

  };
  const submitForm = async () => {
    try {
      const response = await axios.post("/posts", formData);
      return response.data;
    } catch (error) {
      dispatch(addErrorToast(createToast(error)));
    }
  };
  const handleSubmit = async (e) => {
    dispatch(activateLoader());
    e.preventDefault();
    const post = await submitForm();
    if (coverImg) {
      const formDataImg = new FormData();
      formDataImg.append("coverImg", coverImg);
      await submitImg(post._id, formDataImg);
    }
    dispatch(deactivateLoader());
    navigate("/");
  };

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setFormData((prev) => ({ ...prev, content: html }));
  }, [editorState]);
  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size="lg"
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple={false}
            onChange={(e) => {
              setCoverImg(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={formData.title}
            name="title"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            name="category"
            onChange={handleChange}
            value={formData.category}
          >
            <option value=""></option>
            <option value="Category1">Category1</option>
            <option value="Category2">Category2</option>
            <option value="Category3">Category3</option>
            <option value="Category4">Category4</option>
            <option value="Category5">Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button
            type="button"
            size="lg"
            variant="outline-dark"
            onClick={() => {
              setFormData(initialState);
              setEditorState(() => EditorState.createEmpty());
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
