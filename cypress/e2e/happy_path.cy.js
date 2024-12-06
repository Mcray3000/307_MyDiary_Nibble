// happy_path.cy.js

describe('Happy path', () => {
    it('User Cypress logs in and does his stuff', () => {
      //login page
      cy.visit('https://scribbleandnibble.vercel.app/')

      // fill in the form
      cy.get('input[name="name"]').type('Cypress')
      cy.get('input[type="password"]').type('Tester')

      // submit the form 
      cy.get('input.form-button[value="Login"]').click();

      // checking that it correctly brings to main page
      cy.contains('Create New Entry').should('be.visible');
      cy.url().should('include', '/main');

      // create new entry button
      cy.get('a.create-button').click();

      // should be on diary entry edit page
      cy.url().should('include', '/diary');

      // initial should be private
      cy.get('span.diary-private.private').should('have.text', 'Private');

      // change to public view 
      cy.get('button.diary-button').find('img[alt="Lock"]').click();
      cy.get('span.diary-private.public').should('have.text', 'Public');

      // creating entry
      cy.get('input.diary-title').type('Public Test Entry');
      cy.get('input.diary-title').should('have.value', 'Public Test Entry');

      cy.get('textarea[placeholder="Scribble here..."]').type('Generates new public entry');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', 'Generates new public entry');

      // trash entry
      cy.get('button.diary-button').find('img[alt="Trash"]').click();
      cy.get('input.diary-title').should('have.value', '');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', '');

      // re-write entry and save 
      cy.get('input.diary-title').type('Public Test Entry');
      cy.get('input.diary-title').should('have.value', 'Public Test Entry');

      cy.get('textarea[placeholder="Scribble here..."]').type('Generates new public entry');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', 'Generates new public entry');
      cy.get('button.diary-button').find('img[alt="Save"]').click();

      // navigates back to home/main page
      cy.url().should('eq', 'https://scribbleandnibble.vercel.app/main');
    })
  })