import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = ({ posts }) => {
  return (
    <Row>
      {posts.map((post) => (
        <Col
          key={post._id}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
