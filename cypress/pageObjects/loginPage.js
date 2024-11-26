// cypress/pageObjects/loginPage.js

class LoginPage {
    constructor() {
        this.usernameField = '.ant-form-item-children > .ant-input';
        this.passwordField = '.ant-input-password > .ant-input';
        this.loginButton = '.ant-btn';
    }

    // Opens the login page based on the environment
    open() {
        // Fetch the environment (default to 'test' if not specified)
        const environment = Cypress.env('ENV') || 'test';

        // Load the environment URL from the fixture
        cy.fixture('environment').then((envConfig) => {
            const url = envConfig[environment].url;
            cy.visit(url);
        });
    }

    // Enters the username
    enterUsername(username) {
        cy.get(this.usernameField).clear().type(username);
    }

    // Enters the password
    enterPassword(password) {
        cy.get(this.passwordField).clear().type(password);
    }

    // Clicks the login button
    clickLogin() {
        cy.get(this.loginButton).click();
    }

    // Combines steps for a full login process
    login(username, password) {
        this.open(); // Open the login page
        this.enterUsername(username); // Enter username
        this.enterPassword(password); // Enter password
        this.clickLogin(); // Click login
        this.clickLogin()
    }
    
}

export const loginPage = new LoginPage();
