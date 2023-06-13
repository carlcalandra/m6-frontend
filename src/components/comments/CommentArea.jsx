import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { addErrorToast } from "../../store/toastSlicer";
import createToast from "../../utils/toast";
import axios from "../../api/api";
const CommentArea = ({ comments, postId, setPostLoader }) => {
  const dispatch = useDispatch();
  const authorId = useSelector((state) => state.user.id);
  const initialFormData = {
    content:"",
    author:authorId
  }
  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`/posts/${postId}/comments`, formData);
      setFormData(initialFormData)
      setPostLoader(true)

    } catch (error) {
      dispatch(addErrorToast(createToast(error)));
    }
  };
  const handleFormData = (e) => {
    setFormData(prev => ({...prev, content:e.target.value}))
  }
  const commentEls = comments.map((comment) => (
    <Comment key={comment._id} comment={comment}  />
  ));
  return (
    <div>
      <div>
        <h4>Comments</h4>
        {comments.length === 0 && (
          <p>No one commented this post, be the first</p>
        )}
        {comments.length > 0 && commentEls}
      </div>
      <CommentForm handleSubmit={handleSubmit} formData={formData} handleFormData={handleFormData}/>
    </div>
  );
};

export default CommentArea;
