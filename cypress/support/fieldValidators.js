// cypress/support/fieldValidators.js

// Import the loginPage object to access its methods
import { loginPage } from "../pageObjects/loginPage";

// Function to validate form fields
export function validateFields({ fields = {}, expectedErrors = [] }) {
    // Populate form fields based on the provided 'fields' object
    Object.entries(fields).forEach(([field, value]) => {
        const selector = getFieldSelector(field);
        cy.get(selector).clear();
        
        if (value) {
            cy.get(selector).type(value);
        }
    });

    // Click the login button or form submit after setting fields
    loginPage.clickLogin(); // This line requires loginPage to be defined

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
function getFieldSelector(field) {
    const selectors = {
        username: '.ant-form-item-children > .ant-input',
        password: '.ant-input-password > .ant-input',
    };
    return selectors[field];
}
