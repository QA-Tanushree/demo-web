// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

// cypress/support/commands.js

import { loginPage } from "../pageObjects/loginPage";

// Custom command for logging in with credentials from a fixture
Cypress.Commands.add('login', () => {
    // Load credentials from the fixture file
    cy.fixture('userCredentials').then((credentials) => {
        loginPage.login(credentials.username, credentials.password);
    });
});

// Custom command for validating toast messages
Cypress.Commands.add('validateToast', (message) => {
    cy.get('.ant-message-custom-content > span').should('contain.text', message);
});




// Cypress.Commands.add('merchantLogin',()=>{
//     const loginPage = new LoginPage()
//     cy.fixture('testData.json').then((data) => {
//         const { merchantUser, live_merchantUser,merchant_password,merchantPortal} = data
    
//         loginPage.openPortal(merchantPortal)
//         loginPage.enterUsername(merchantUser)
//         loginPage.enterPassword(merchant_password)
//         loginPage.clickLogin()
//         loginPage.clickLogin()

//         //cy.get(loginPage.as_ConfirmDashboard).should('contain','Welcome')
//     })
// })