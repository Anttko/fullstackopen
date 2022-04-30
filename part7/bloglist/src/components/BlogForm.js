import React from "react";
import { createBlog } from "../reducers/blogReducer";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../styles/common.styles";

const BlogForm = (props) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);

  const addBlog = (event) => {
    event.preventDefault();
    if (title === "" || author === "") {
      dispatch(setNotification(`a log must have author and title`, 5));
    } else {
      const text = `a blog ${title.value} added by ${author.value} `;
      dispatch(
        createBlog({
          title: title.value,
          author: author.value,
          url: url.value,
        })
      );
      dispatch(setNotification(text, 5));
      navigate("/blogs");
    }
  };

  if (user === null) {
    return null;
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <Input
          type={title.type}
          value={title.value}
          id="title-input"
          name="title"
          placeholder="add title"
          onChange={title.onChange}
        />
      </div>
      <div>
        <Input
          type={author.type}
          id="author-input"
          value={author.value}
          name="author"
          placeholder="add author"
          onChange={author.onChange}
        />
      </div>
      <div>
        <Input
          type={url.type}
          id="url-input"
          value={url.value}
          name="author"
          placeholder="add url"
          onChange={url.onChange}
        />
      </div>
      <Button type="submit">create</Button>
      <Button
        type="button"
        onClick={() => {
          title.reset();
          author.reset();
          url.reset();
        }}
      >
        reset
      </Button>
    </form>
  );
};

export default BlogForm;
