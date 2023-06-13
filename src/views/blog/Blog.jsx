import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import axios from "../../api/api";
import { useDispatch } from "react-redux";
import { addErrorToast } from "../../store/toastSlicer";
import createToast from "../../utils/toast";
import CommentArea from "../../components/comments/CommentArea";

const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [postLoader, setPostLoader] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = params;
  const getPost = async () => {
    const response = await axios.get(`/posts/${id}`);
    const blog = response.data;
    try {
      if (blog) {
        setBlog(blog);
        setLoading(false);
      } else {
        navigate("/404");
      }
    } catch (error) {
      dispatch(addErrorToast(createToast(error)));
    }
  };
  useEffect(() => {
    if (postLoader) {
      getPost();
      setPostLoader(false)
    }
    
  }, [id, postLoader]);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
          <CommentArea comments = {blog.comments} postId={blog._id} setPostLoader={setPostLoader}/>
        </Container>
      </div>
    );
  }
};

export default Blog;