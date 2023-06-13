import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../../components/searchbar/SearchBar";
import axios from "../../api/api";
import BlogSpinner from "../../components/spinner/BlogSpinner";
import { useDispatch } from "react-redux";
import createToast from "../../utils/toast";
import { addErrorToast } from "../../store/toastSlicer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const nextPage = useRef(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/posts?itemsPerPage=9&pageNumber=" + page
      );
      setPosts((prev) => [...prev, ...response.data.posts]);
      setTotalPages(response.data.totalPages);
      nextPage.current = page + 1;
    } catch (error) {
      dispatch(addErrorToast(createToast(error)));
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      if (
        currentScroll > documentHeight &&
        !loading &&
        page < totalPages &&
        page === nextPage.current - 1
      ) {
        setPage((prev) => prev + 1);
      }
    };
    document.removeEventListener("scroll", handleScroll);
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [page, loading, totalPages, nextPage.current]);
  useEffect(() => {
    if (page === nextPage.current && !loading) {
      fetchPosts();
    }
  }, [page, loading]);
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLocaleLowerCase())
  );
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <div>
        <BlogList posts={filteredPosts} />
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <BlogSpinner />
        </div>
      )}
    </Container>
  );
};

export default Home;
