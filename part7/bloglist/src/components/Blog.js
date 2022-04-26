import React from "react";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonRemove = {
    color: "black",
    backgroundColor: "red",
    borderRadius: 4,
  };

  const like = async () => {
    const info = `you liked ${blog.title}`;
    dispatch(likeBlog(blog));
    dispatch(setNotification(info, 5));
  };

  const removeBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title}`)) {
      const info = `you removed ${blog.title}`;
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(info, 5));
    } else {
      const cancel = `deleting blog cancelled`;
      dispatch(setNotification(cancel, 5));
    }
  };

  return (
    <div style={blogStyle}>
      <h2>{blog.title}</h2>
      <div className="title">{blog.title}</div>
      <div className="author">{blog.author}</div>
      <div className="url">{blog.url}</div>
      <div className="likes">
        LIKES: {blog.likes}{" "}
        <button id="likeButton" onClick={() => like()}>
          Like
        </button>
        <div>
          <button style={buttonRemove} onClick={() => removeBlog()}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
  /*{user.username === blog.user.username
          ? <div><button style={buttonRemove} onClick={() => deleteBlog(blog.id)}>remove</button></div>
          : ''}*/
};

export default Blog;
