import React from "react";
import { createBlog } from "../reducers/blogReducer";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const BlogForm = (props) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    if (title === "" || author === "") {
      dispatch(setNotification(`a log must have author and title`, 5));
    } else {
      const text = `a blog ${title.value} added by ${author.value} `
      dispatch(
        createBlog({
          title: title.value,
          author: author.value,
          url: url.value,
        })
      );
      dispatch(setNotification(text, 5));
    }
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type={title.type}
          value={title.value}
          id="title-input"
          name="title"
          placeholder="add title"
          onChange={title.onChange}
        />
      </div>
      <div>
        author:
        <input
          type={author.type}
          id="author-input"
          value={author.value}
          name="author"
          placeholder="add author"
          onChange={author.onChange}
        />
      </div>
      <div>
        url:
        <input
          type={url.type}
          id="url-input"
          value={url.value}
          name="author"
          placeholder="add url"
          onChange={url.onChange}
        />
      </div>
      <button type="submit">create</button>
      <button
        type="button"
        onClick={() => {
          title.reset();
          author.reset();
          url.reset();
        }}
      >
        reset
      </button>
    </form>
  );
};

export default BlogForm;
