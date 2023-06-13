import React from "react";
import { Button, Form } from "react-bootstrap";
const CommentForm = ({ handleSubmit, formData, handleFormData }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        as={"textarea"}
        required
        className="my-3"
        placeholder="Insert your comment here"
        name="content"
        value={formData.content}
        onChange={handleFormData}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CommentForm;
