// ./cypress/e2e/login.cy.js

describe('User login', () => {
    it('User cannot log in with empty textboxes', () => {
      //login page
      cy.visit('http://localhost:5173/')

      // submit the form 
      cy.get('input.form-button[value="Login"]').click();

      // error message
      cy.contains('Invalid username or password').should('be.visible');
      cy.url().should('eq', 'http://localhost:5173/');

    })
  })

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

  describe('User creation', () => {
    it('User creates an account', () => {
    
    // cy.intercept('POST', '**', (req) => {
    //     console.log(req);
    //     }).as('allRequests');

      // mock API call for user creation
      cy.intercept('POST', '/users', {
        statusCode: 201,
        body: { message: 'User created successfully!' },
      }).as('createUser');

      //login page
      cy.visit('http://localhost:5173/')

      // click button to create a new user
      cy.get('input.form-button[value="New User"]').click();

      // fill in the form
      cy.get('input[name="name"]').type('Cypress')
      cy.get('input[type="password"]').type('Password')

      // create user 
      cy.get('input.form-button[value="Create"]').click();

      // wait for mocked API call
      cy.wait('@createUser').its('request.body').should('deep.equal', {
        name: 'Cypress',
        password: 'Password',
      });

    })
  })