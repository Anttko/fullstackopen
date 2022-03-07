const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const api = supertest(app)
const User = require('../models/user')

const helper = require('./test_helper')


beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('test', 10)
    const user = new User({ username: 'test', password: passwordHash })
    await user.save()

    await Blog.insertMany(helper.initialBlogs)

})

describe('Blog tests', () => {

    test('adding new user', async () => {
        const newUser = {
            username: 'tester',
            name: 'test tester',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    })

    test('add a blog with auth key', async () => {

        const testBlgo = {
            title: "test blog",
            author: "tester tester",
            url: "https://tester.com/",
            likes: 12345
        }

        const newUser = {
            username: 'tester',
            name: 'test tester',
            password: 'salainen',
        }
        await api
            .post('/api/users')
            .send(newUser)
        const loginTest = {
            username: 'tester',
            password: 'salainen'
        }
        let resp = await api.post("/api/login").send(loginTest)
        let token = resp.body.token

        console.log('-----------')
        console.log('resp body: ' + resp.body.token)
        console.log('-----------')


        await api
            .post('/api/blogs')
            .send(testBlgo)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const contents = blogAtEnd.map(b => b.title)
        expect(contents).toContain('React patterns')
    })


    test('4.8 blog posts are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })



    test('blog size matches', async () => {
        const newUser = {
            username: 'tester',
            name: 'test tester',
            password: 'salainen',
        }
        await api
            .post('/api/users')
            .send(newUser)
        const loginTest = {
            username: 'tester',
            password: 'salainen'
        }
        let resp = await api.post("/api/login").send(loginTest)
        let token = resp.body.token

        const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })


    test('check if id is defined instead of _id', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })


    test('check if likes default value is 0', async () => {
        const newBlog = {
            title: "testi1",
            author: "julkaisija1",
            url: "www.testi1.com",
        }
        const newUser = {
            username: 'tester',
            name: 'test tester',
            password: 'salainen',
        }
        await api
            .post('/api/users')
            .send(newUser)
        const loginTest = {
            username: 'tester',
            password: 'salainen'
        }
        let resp = await api.post("/api/login").send(loginTest)
        let token = resp.body.token


        const response = await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })



    test('blog cannot be added without title', async () => {
        const newBlog = {
            author: "julkaisija1",
            url: "www.testi1.com",
        }
        const newUser = {
            username: 'tester',
            name: 'test tester',
            password: 'salainen',
        }
        await api
            .post('/api/users')
            .send(newUser)
        const loginTest = {
            username: 'tester',
            password: 'salainen'
        }
        let resp = await api.post("/api/login").send(loginTest)
        let token = resp.body.token

        await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })



    test('blog cannot be added without url', async () => {
        const newBlog = {
            title: "testi1",
            author: "julkaisija1",

        }
        const newUser = {
            username: 'tester',
            name: 'test tester',
            password: 'salainen',
        }
        await api
            .post('/api/users')
            .send(newUser)
        const loginTest = {
            username: 'tester',
            password: 'salainen'
        }
        let resp = await api.post("/api/login").send(loginTest)
        let token = resp.body.token

        await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('a blog can be deleted', async () => {


        const newUser = {
            username: 'tester',
            name: 'test tester',
            password: 'salainen',
        }
        await api
            .post('/api/users')
            .send(newUser)
        const loginTest = {
            username: 'tester',
            password: 'salainen'
        }
        let resp = await api.post("/api/login").send(loginTest)
        let token = resp.body.token

        const newBlog = {
            title: "testi1",
            author: "julkaisija1",
            url: "www.testi1.com",
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    
        const id = response.body.id
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
    })


    test('blog likes can be edited', async () => {
        const editLikes =
        {
            likes: 900
        }
        const response = await api.get('/api/blogs')

        const id = response.body[1].id

        const responseEdit = await api
            .put(`/api/blogs/${id}`)
            .send(editLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(responseEdit.body.likes).toBe(editLikes.likes)
    })

    test('401 without token', async () => {
        const newBlog = {
            title: "testi1",
            author: "julkaisija1",
            url: "www.testi1.com",
        }
        let token = null
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(401);
    
    })

})

afterAll(() => {
    mongoose.connection.close()
})


