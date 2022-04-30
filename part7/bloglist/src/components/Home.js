import React from "react";
import { useSelector } from "react-redux";
import { HomeView } from "../styles/common.styles";

const Home = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <HomeView>
      <h1>Welcome to blog site</h1>
      <div>There are currently {blogs.length} blogs written in the site</div>
    </HomeView>
  );
};

export default Home;
