import React, { useState } from 'react'


const Blog = ({ blog, blogLike, deleteBlog, user }) => {
  const [blogDataVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonRemove = {
    color: 'black',
    backgroundColor: 'red',
    borderRadius: 4,
  }

  const hideWhenVisible = { display: blogDataVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDataVisible ? '' : 'none' }


  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={() => setBlogVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        <div className='title'>{blog.title}</div>
        <div className='author'>{blog.author}</div>
        <div className='url'>{blog.url}</div>
        <div className='likes'>LIKES: {blog.likes} <button id='likeButton' onClick={() => blogLike(blog.id, blog.user.id, blog.title, blog.author, blog.url, blog.likes)}>Like</button></div>
        <button onClick={() => setBlogVisible(false)}>hide</button>
        {user.username === blog.user.username
          ? <div><button style={buttonRemove} onClick={() => deleteBlog(blog.id)}>remove</button></div>
          : ''}
      </div>
    </div>
  )
}

export default Blog