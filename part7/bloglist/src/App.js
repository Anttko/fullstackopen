import React, { useEffect, useRef } from "react";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import { initializeUser } from "./reducers/loginReducer";
import Menu from "./components/Menu";
import { Routes, Route, useMatch } from "react-router-dom";
import Users from "./components/Users";
import Blog from "./components/Blog";
import User from "./components/User";
import Home from "./components/Home";
import { getUsers } from "./reducers/userReducer";
import { NewBlogView } from "./styles/common.styles";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const usr = useSelector((state) => state.login);
  const allUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getUsers());
    dispatch(initializeUser());
  }, [dispatch]);

  const match = useMatch("/blogs/:id");
  const blogById = (id) => blogs.find((b) => b.id === id);
  const blog = match ? blogById(match.params.id) : null;

  const matchUser = useMatch("/users/:id");
  const userById = (id) => allUsers.find((u) => u.id === id);
  const findUsr = matchUser ? userById(matchUser.params.id) : null;

  console.log(match);
  console.log("blog match,", blog);

  console.log("user match", matchUser);
  console.log("find user match,", findUsr);

  return (
    <div>
      <Menu />
      <Notification />
      <NewBlogView>
        {usr === null ? (
          <div></div>
        ) : (
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        )}
      </NewBlogView>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={findUsr} />} />
      </Routes>
    </div>
  );
};

export default App;
