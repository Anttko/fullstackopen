import { handleLogOut } from "../reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import Togglable from "./Togglable";
import { useNavigate } from "react-router-dom";
import { Navigation, NavigationItem, Button } from "../styles/common.styles";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  const navigate = useNavigate();

  const logout = async (event) => {
    event.preventDefault();
    dispatch(handleLogOut());
    navigate("/");
  };

  return (
    <div>
      <Navigation>
        <NavigationItem href="/">home</NavigationItem>
        <NavigationItem href="/blogs">blogs</NavigationItem>
        <NavigationItem href="/users">users</NavigationItem>
        {user === null ? (
          <NavigationItem>
            <Togglable buttonLabel="login">
              <LoginForm />
            </Togglable>
          </NavigationItem>
        ) : (
          <NavigationItem>
            {user} logged in <Button onClick={logout}>logout</Button>
          </NavigationItem>
        )}
      </Navigation>
    </div>
  );
};

export default Menu;
