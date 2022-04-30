import React from "react";
import { useField } from "../hooks";
import { handleLogin } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { Button, Input } from "../styles/common.styles";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    dispatch(handleLogin(credentials));
    username.reset()
    password.reset()
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <Input
            id="username"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
            placeholder="your username"
          />
        </div>
        <div>
          password
          <Input
            id="password"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
            placeholder="your password"
          />
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
