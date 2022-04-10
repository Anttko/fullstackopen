describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })
  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('cancel').click()
  })
  it('succeeds with correct credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('test logged in')
    cy.contains('logout').click()
  })
  it('fails with wrong credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'test logged in')
  })

})
describe('when logged in', function() {
  beforeEach(function() {
    cy.login({ username: 'test', password: 'test' })  })

  it('logged in', function () {
    cy.visit('http://localhost:3000')
    cy.contains('test logged in')
  })



  it('a new blog can be liked', function() {
    cy.contains('test logged in')
    cy.createBlog({ title: 'testlike', author: 'test1', url: 'www', likes: 54 })
    cy.contains('show').click()
    cy.get('#likeButton').click()
    cy.contains('LIKES: 55')
  })

  it('a new blog can be deleted', function() {
    cy.contains('test logged in')

    cy.contains('show').click()

    cy.contains('remove').click()
    cy.contains('removed succesfully')
  })

  describe('check if sort works by like amount', function () {
    beforeEach(function () {
      cy.createBlog({ title: 'test1', author: 'test1', url: 'www', likes: 54 })
      cy.createBlog({ title: 'test2', author: 'test2', url: 'www', likes: 121 })
    })

    it('they are sorted by likes', function () {
      cy.contains('test logged in')
      cy.contains('test1')
      cy.contains('test2')
      cy.get('.list').then((blogs) => {
        console.log(blogs.children().children()[0])
        expect(blogs.children().children()[0]).to.contain('test2')
        expect(blogs.children().children()[1]).to.contain('test1')
      })
    })

  })
})

