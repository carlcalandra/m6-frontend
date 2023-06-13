import React from "react";
import {InputGroup, Form } from "react-bootstrap"

const SearchBar = ({query, setQuery}) => {
    const handleChange =(e) => {
        setQuery(e.target.value)
    }
  return (
    <InputGroup className="mb-3 w-50">
      <InputGroup.Text id="basic-addon1">
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon1"
        value={query}
        onChange={handleChange}
      />
    </InputGroup>
  );
};

export default SearchBar;
