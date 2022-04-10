import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import AddBlog from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(true)


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => { setErrorState(false); setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }
  const reloadBlogs = async () => {
    const reloadedBlogs = await blogService.getAll()
    setBlogs(reloadedBlogs)
  }

  const createBlog = async blog => {
    blogFormRef.current.toggleVisibility()
    if (blog.author === '' || blog.title === '') {
      setErrorMessage(
        'Blog must have title and author '
      )
      setTimeout(() => {
        setErrorMessage(null)
        setErrorState(true)
      }, 5000)
    } else {
      await blogService
        .create(blog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setErrorState(false)
          setErrorMessage(
            `a blog ${returnedBlog.title} by ${returnedBlog.author} added`
          )
          setTimeout(() => {
            setErrorMessage(null)
            setErrorState(true)
          }, 5000)

        })
      reloadBlogs()
    }
  }

  const logout = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const blogLike = async (id, user, title, author, url, likes) => {
    await blogService.update(id, { user, title, author, url, likes: likes + 1 })
    reloadBlogs()
  }
  const deleteBlog = async (id) => {
    const finder = blogs.find(p => p.id === id).title
    if (window.confirm(`Delete blog ${finder}`)) {
      const request = await blogService.remove(id)
      console.log(request)
      setBlogs(blogs.filter(p => p.id !== id))
      setErrorState(false)
      setErrorMessage(
        'removed succesfully'
      )
      setTimeout(() => {
        setErrorMessage(null)
        setErrorState(true)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Blogs</h2>
      <ErrorMessage message={errorMessage} errorState={errorState} />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <div>{user.name} logged in {logout()}</div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <h2>NEW BLOG</h2>
            <AddBlog createBlog={createBlog}
            />
          </Togglable>
          <div className='list'>
            <ul>
              {blogs.sort(function (a, b) { return b.likes - a.likes }).map(blog =>
                <Blog key={blog.id} blog={blog} blogLike={blogLike} deleteBlog={deleteBlog} user={user} />
              )}
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default App