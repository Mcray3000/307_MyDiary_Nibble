// ./cypress/e2e/login.cy.js

describe('User login', () => {
    it('User successfully logs in', () => {
      //login page
      cy.visit('http://localhost:5173/')

      // fill in the form
      cy.get('input[name="name"]').type('Bobo')
      cy.get('input[type="password"]').type('Bottler')

      // submit the form 
      cy.get('input.form-button[value="Login"]').click();

      // checking that it correctly brings to main page
      cy.contains('Create New Entry').should('be.visible');
      cy.url().should('include', '/main');
    })
  })

  describe('User login fail', () => {
    it('User can not log in with wrong password', () => {
      //login page
      cy.visit('http://localhost:5173/')

      // fill in the form
      cy.get('input[name="name"]').type('Bobo')
      cy.get('input[type="password"]').type('WrongPassword')

      // submit the form 
      cy.get('input.form-button[value="Login"]').click();

      // error message
      cy.contains('Invalid username or password').should('be.visible');
      cy.url().should('eq', 'http://localhost:5173/');
    })
  })