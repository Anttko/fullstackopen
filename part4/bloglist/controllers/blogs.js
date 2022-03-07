const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    console.log('POST', request.body)
    const body = request.body
    const user = request.user


    if (body.title === '' || body.author === '' || body.url === '') {
        response.status(400).send({ error: 'remember to fill title, author and url' })
    }

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', async (request, response) => {
    console.log('del id', request.params.id)
    console.log('del req bod', request.body)
    const compareBlog = await Blog.findById(request.params.id)
    if (compareBlog.user.toString() === request.user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).send({ error: 'unathorized' })
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const updateBlog = {
        likes: body.likes
    }
    await Blog.findByIdAndUpdate(request.params.id, updateBlog)
    const updatedBlog = await Blog.findById(request.params.id)
    response.json(updatedBlog)
})


module.exports = blogsRouter