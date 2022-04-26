import React from "react";

import { useField } from "../hooks";
import { handleLogin } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    dispatch(handleLogin(credentials));
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
            placeholder="your username"
          />
        </div>
        <div>
          password
          <input
            id="password"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
            placeholder="your password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
