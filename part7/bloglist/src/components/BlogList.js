import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = (props) => {
  const blogs = useSelector((state) => state.blogs);
  console.log("blogs: ", blogs);
  /*.sort(function (a, b) {
    return b.likes - a.likes;
  });*/

  console.log(blogs);

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
