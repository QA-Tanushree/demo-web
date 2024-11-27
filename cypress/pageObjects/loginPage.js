///<reference types="cypress" />

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
    }

    // Function to validate form fields
    validateFields({ fields = {}, expectedErrors = [] }) {
        // Populate form fields based on the provided 'fields' object
        Object.entries(fields).forEach(([field, value]) => {
            const selector = this.getFieldSelector(field);
            cy.get(selector).clear();
            
            if (value) {
                cy.get(selector).type(value);
            }
        });

        // Click the login button or form submit after setting fields
        this.clickLogin(); // This line requires loginPage to be defined

        // Check for each expected error message
        expectedErrors.forEach((error) => {
            cy.contains(error).should('be.visible');
        });

        // If no errors are expected, confirm no error modals are shown
        if (expectedErrors.length === 0) {
            cy.get('.ant-modal-confirm-title').should('not.exist');
        }
    }

    // Helper function to map field names to selectors
    getFieldSelector(field) {
        const selectors = {
            username: '.ant-form-item-children > .ant-input',
            password: '.ant-input-password > .ant-input',
        };
        return selectors[field];
    }
}

// Export an instance of the class
export const loginPage = new LoginPage();

