import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);


  console.log("users", users);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <td></td>
          <td>
            <strong>blogs created</strong>
          </td>
        </tr>
        {users.map((u) => (
          <tr>
            <td key={u.username}>
              <Link to={`/users/${u.id}`} key={u.id}>
                {u.name}
              </Link>
            </td>
            <td key={u.id}>{u.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
