import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
/*import userEvent from '@testing-library/user-event'*/

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  let container
  container = render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('add title')
  const authorInput = screen.getByPlaceholderText('add author')
  const urlInput = screen.getByPlaceholderText('add url')

  fireEvent.change(titleInput, {
    target: { value: 'test title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'test author' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.url.com' }
  })

  const form = container.container.querySelector('form')
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.url.com')
})
