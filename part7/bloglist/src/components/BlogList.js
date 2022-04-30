import { useSelector } from "react-redux";
import {
  StyledLink,
  ListItem,
  CenterUL,
  Title,
  BlogListing,
} from "../styles/common.styles";

const BlogList = (props) => {
  const blogs = useSelector((state) => state.blogs);
  console.log("blogs: ", blogs);

  console.log(blogs);

  return (
    <BlogListing>
      <Title>Blogs</Title>
      <CenterUL>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <StyledLink to={`/blogs/${blog.id}`} key={blog.id}>
              {blog.title}
            </StyledLink>
          </ListItem>
        ))}
      </CenterUL>
    </BlogListing>
  );
};

export default BlogList;
