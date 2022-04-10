import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (

    <form onSubmit={addBlog}>

      <div> title: <input
        value={title}
        id='title-input'
        name="title"
        placeholder='add title'
        onChange={({ target }) => setTitle(target.value)} /></div>
      <div>author: <input
        id='author-input'
        value={author}
        name="author"
        placeholder='add author'
        onChange={({ target }) => setAuthor(target.value)}
      /></div>
      <div>url: <input
        id='url-input'
        value={url}
        name="author"
        placeholder='add url'
        onChange={({ target }) => setUrl(target.value)}
      /></div>
      <button type="submit">create</button>
    </form>

  )


}

export default BlogForm