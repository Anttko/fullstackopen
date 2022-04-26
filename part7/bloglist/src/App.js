import React, { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import { initializeUser } from "./reducers/loginReducer";
import Menu from "./components/Menu";
import { Routes, Route, Link, useMatch, Navigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <div>
      <Menu />
      <h2>Blogs</h2>
      <Notification />
      <Togglable buttonLabel="login">
        <LoginForm />
      </Togglable>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
