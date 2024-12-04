// ./cypress/e2e/entry.cy.js

describe('Create new entry', () => {
    it('User cannot log in with empty textboxes', () => {
      //login page
      cy.visit('http://localhost:5173/')

      // fill in the form
      cy.get('input[name="name"]').type('Bobo')
      cy.get('input[type="password"]').type('Bottler')

      // submit the form 
      cy.get('input.form-button[value="Login"]').click();

      // create new entry button
      cy.get('a.create-button').click();

      // should be on diary entry edit page
      cy.url().should('include', '/diary');


    })
  })
