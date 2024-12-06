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
      cy.wait(1000);

      // checking that it correctly brings to main page
      cy.contains('Create New Entry').should('be.visible');
      cy.url().should('include', '/main');

      // create new entry button
      cy.get('a.create-button').click();
      cy.wait(1000);

      // should be on diary entry edit page
      cy.url().should('include', '/diary');

      // initial should be private
      cy.get('span.diary-private.private').should('have.text', 'Private');

      // change to public view 
      cy.get('button.diary-button').find('img[alt="Lock"]').click();
      cy.wait(1000);
      cy.get('span.diary-private.public').should('have.text', 'Public');

      // creating entry
      cy.get('input.diary-title').type('Public Test Entry');
      cy.get('input.diary-title').should('have.value', 'Public Test Entry');

      cy.get('textarea[placeholder="Scribble here..."]').type('Generates new public entry');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', 'Generates new public entry');

      // trash entry
      cy.get('button.diary-button').find('img[alt="Trash"]').click();
      cy.wait(1000);
      cy.get('input.diary-title').should('have.value', '');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', '');

      // re-write entry and save 
      cy.get('input.diary-title').type('Public Test Entry');
      cy.get('input.diary-title').should('have.value', 'Public Test Entry');


      cy.get('textarea[placeholder="Scribble here..."]').type('Generates new public entry');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', 'Generates new public entry');
      cy.get('button.diary-button').find('img[alt="Save"]').click();
      cy.wait(1000);

      // navigates back to home/main page
      cy.url().should('eq', 'https://scribbleandnibble.vercel.app/main');
      cy.contains('Public Test Entry').should('be.visible');

      cy.get('a.create-button').click();
      cy.wait(1000);
      cy.get('input.diary-title').type('Private Test Entry');
      cy.get('input.diary-title').should('have.value', 'Private Test Entry');

      cy.get('textarea[placeholder="Scribble here..."]').type('Generates new private entry');
      cy.get('textarea[placeholder="Scribble here..."]').should('have.value', 'Generates new private entry');
      cy.get('button.diary-button').find('img[alt="Save"]').click();
      cy.wait(1000);

      cy.contains('Private Test Entry').should('be.visible');

      // navigate to Public page
      cy.get('button.hamburger-button').find('img[alt="Menu"]').click();
      cy.wait(1000);
      cy.contains('a', 'Public Scribbles').click();
      cy.wait(1000);
      cy.contains('Public Test Entry').should('be.visible');
      cy.contains('Private Test Entry').should('not.exist');

      // others entries are view only
      cy.get('a[href="/discover/11"]').click();
      cy.wait(1000);
      cy.url().should('eq', 'https://scribbleandnibble.vercel.app/discover/11');
      cy.get('input[type="text"]').should('not.exist');

      // navigate to Calendar page
      cy.get('button.hamburger-button').find('img[alt="Menu"]').click();
      cy.wait(1000);
      cy.contains('a', 'Calendar').click();
      cy.wait(1000);
      cy.url().should('eq', 'https://scribbleandnibble.vercel.app/calendar');
      cy.get('button.round-button').eq(1).click();
      cy.wait(1000);
      cy.contains('button', '5').click();
      cy.wait(1000);
      cy.contains('Calendar Test').should('be.visible');

      // view page only
      cy.get('a[href="/discover/112"]').click();
      cy.wait(1000);
      cy.url().should('eq', 'https://scribbleandnibble.vercel.app/discover/112');
      cy.get('input[type="text"]').should('not.exist');

      // navigate to home page
      cy.get('button.hamburger-button').find('img[alt="Menu"]').click();
      cy.wait(1000);
      cy.contains('a', 'Home').click();
      cy.wait(1000);
      cy.url().should('eq', 'https://scribbleandnibble.vercel.app/main');
      cy.contains('div', 'Public Test Entry').click();
      cy.wait(1000);
      // editable
      cy.get('input[type="text"]').should('exist');
      cy.get('button.diary-button').find('img[alt="Trash"]').click();
      cy.wait(1000);

      cy.contains('div', 'Private Test Entry').click();
      cy.wait(1000);
      // editable
      cy.get('input[type="text"]').should('exist');
      cy.get('button.diary-button').find('img[alt="Trash"]').click();
      cy.wait(1000);

      cy.contains('Private Test Entry').should('not.exist');
      cy.contains('Public Test Entry').should('not.exist');

      // logout and bring you to login page
      cy.get('button.hamburger-button').find('img[alt="Menu"]').click();
      cy.wait(1000);
      cy.contains('a', 'Logout').click();
      cy.wait(1000);
      cy.url().should('eq', 'https://scribbleandnibble.vercel.app/');

    })
  })