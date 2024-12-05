// ./cypress/e2e/entry.cy.js

describe('Change accessibility', () => {
    it('User toggles public and private', () => {

        cy.visit('https://scribbleandnibble.vercel.app/')
        cy.get('input[name="name"]').type('Bobo')
        cy.get('input[type="password"]').type('Bottler')
        cy.get('input.form-button[value="Login"]').click()
        cy.get('a.create-button').click();

        // initial should be private
        cy.get('span.diary-private.private').should('have.text', 'Private');

        // change to public
        cy.get('button.diary-button').find('img[alt="Lock"]').click();
        cy.get('span.diary-private.public').should('have.text', 'Public');

        // and back
        cy.get('button.diary-button').find('img[alt="Lock"]').click();
        cy.get('span.diary-private.private').should('have.text', 'Private');


    })
  })

  describe('Create new entry', () => {
    it('User creates a new entry and saves it', () => {
      //login page
      cy.visit('https://scribbleandnibble.vercel.app/')

      // fill in the form
      cy.get('input[name="name"]').type('Bobo')
      cy.get('input[type="password"]').type('Bottler')

      // submit the form 
      cy.get('input.form-button[value="Login"]').click();

      // create new entry button
      cy.get('a.create-button').click();

      // should be on diary entry edit page
      cy.url().should('include', '/diary');

      cy.get('input.diary-title').type('My First Diary Entry');
      cy.get('input.diary-title').should('have.value', 'My First Diary Entry');

      cy.get('textarea[placeholder="Scribble here..."]').type('This is my diary content.');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', 'This is my diary content.');

    })
  })



