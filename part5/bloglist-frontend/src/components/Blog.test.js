import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
const blog = {
  title: 'testing blog',
  author: 'testing testing',
  user: {
    username: '123',
    name: '12',
    id: '6221d7968f1dc80e52f1a459'
  },
  id: '62504a0c7504894e71fbb2a0'
}
const user = {
  username: '123'
}

const blogLike = jest.fn()
const deleteBlog = jest.fn()

describe('testing <Blog />', () => {
  let container
  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} blogLike={blogLike} deleteBlog={deleteBlog} />).container
  })

  test('renders content', () => {
    const element = screen.findAllByText('testing blog')
    expect(element).toBeDefined()
  })

  test('show button works and no likes or url', () => {
    const button = screen.getByText('show')
    userEvent.click(button)

    const likes = container.querySelector('.likes')
    const url = container.querySelector('.url')

    expect(likes).not.toHaveTextContent()
    expect(url).not.toHaveTextContent()
  })

  test('like returns calls 2 times', () => {
    const button = screen.getByText('show')
    fireEvent.click(button)

    const likeButton = screen.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(blogLike.mock.calls).toHaveLength(2)
  })

})

const blog1 = {
  title: 'testing blog',
  author: 'testing testing',
  likes: 10,
  url: 'www.test.com',
  user: {
    username: '123',
    name: '12',
    id: '6221d7968f1dc80e52f1a459'
  },
  id: '62504a0c7504894e71fbb2a0'
}

describe('more testing <Blog />', () => {
  let cont
  beforeEach(() => {
    cont = render(<Blog blog={blog1} user={user} blogLike={blogLike} deleteBlog={deleteBlog} />).container
  })
  test('test if shows likes and url', () => {
    const button = screen.getByText('show')
    fireEvent.click(button)
    expect(cont).toHaveTextContent('www.test.com')
    expect(cont).toHaveTextContent('10')
  })



})