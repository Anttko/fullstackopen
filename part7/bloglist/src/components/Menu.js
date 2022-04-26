import { handleLogOut } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
const Menu = () => {
  const dispatch = useDispatch();
  const padding = {
    paddingRight: 5,
  };
  const logout = async () => {
    dispatch(handleLogOut());
  };

  return (
    <div>
      <a href="/blogs" style={padding}>
        blogs
      </a>
      <a href="/users" style={padding}>
        users
      </a>
      <a style={padding}>
        about <button onClick={logout}>logout</button>
      </a>
    </div>
  );
};

export default Menu;
