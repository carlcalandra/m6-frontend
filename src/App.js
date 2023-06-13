import "./App.css";
import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import NavbarContainer from "./components/navbar/NavbarContainer";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import AxiosInterceptor from "./middleware/AxiosInterceptor";
import BlogToastContainer from "./components/toast/BlogToastContainer";
import Oath2 from "./middleware/Oath2";
import Signup from "./views/signup/Signup";
import ErrorsDelete from "./middleware/ErrorsDelete";
import OnlyNotAuthRoutes from "./middleware/OnlyNotAuthRoutes";
import Loader from "./components/loader/Loader";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector(state => state.loader.value);
  return (
    <Router>
      {loading && <Loader />}
      <Routes>
        <Route element={<ErrorsDelete />}>
          <Route element={<OnlyNotAuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/oath2" element={<Oath2 />} />
            <Route element={<AxiosInterceptor />}>
              <Route element={<ProtectedRoutes />}>
                <Route element={<NavbarContainer />}>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/blog/:id" element={<Blog />} />
                  <Route path="/new" element={<NewBlogPost />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <BlogToastContainer />
      <Footer />
    </Router>
  );
}

export default App;
