import React from "react";
const User = ({user}) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>

      {user.blogs.map((a) => (
        <li>{a.title}</li>
      ))}
    </div>
  );
};

export default User;
