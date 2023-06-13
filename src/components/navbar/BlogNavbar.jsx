import React from "react";
import { Button, Container, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/userSlicer";
import logo from "./logo.svg"

const NavBar = (props) => {
  const dispatch = useDispatch();
  const avatar = useSelector(state => state.user.avatar)
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark"
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Post Article
          </Button>
          <Dropdown className="mx-2">
            <Dropdown.Toggle as={"div"} id="dropdown-basic">
              <img
                src={avatar}
                className="rounded-circle profile-img"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Button} type={"button"} onClick={()=> {dispatch(logOut())}}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
