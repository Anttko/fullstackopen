describe('Blog ', function() {

  beforeEach(function(){
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened and closed', function() {
    cy.contains('login').click()
    cy.contains('cancel').click()
  })
  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('123')
    cy.get('#password').type('123')
    cy.get('#login-button').click()

    cy.contains('12 logged in')
    cy.contains('logout').click()
  })

})

describe('when logged in', function() {
  beforeEach(function() {
    cy.contains('login').click()
    cy.get('#username').type('123')
    cy.get('#password').type('123')
    cy.get('#login-button').click()
  })

  it('a new blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title-input').type('a blog created by cypress')
    cy.get('#author-input').type('cypress author')
    cy.get('#url-input').type('cypress url')
    cy.contains('create').click()
    cy.contains('a blog created by cypress')
    cy.contains('cypress author')
    cy.contains('cypress url')
  })
})