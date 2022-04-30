import loginService from "../services/login";
import blogService from "../services/blogs";
import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return (state = action.payload);
    },
    logoutUser(state, action) {
      return (state = action.payload);
    },
  },
});

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    console.log("dd", loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      console.log("username", user);
      dispatch(setUser(user.username));
    }
  };
};

export const handleLogin = (credentials) => {
  return async (dispatch) => {
    console.log("credentials", credentials);
    const username = credentials.username.value;
    const password = credentials.password.value;
    const loginCredentials = { username, password };
    const login = await loginService.login(loginCredentials);
    console.log("login", login);
    dispatch(setUser(login.username));
    blogService.setToken(login.token);
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(login));
  };
};
export const handleLogOut = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    blogService.setToken(null);
    dispatch(logoutUser(null));
  };
};

export const { setUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
