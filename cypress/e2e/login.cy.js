///<reference types="cypress" />
import { loginPage } from "../pageObjects/loginPage";
import { validateFields } from "../support/fieldValidators";

describe("E2E: Login and Navigation", () => {
    let credentials;
    let messages;

    before(() => {
        // Load user credentials and activity messages from fixtures before running tests
        cy.fixture('userCredentials').then((data) => {
            credentials = data; // Store the loaded user credentials
        });
        cy.fixture('activityContent').then((data) => {
            messages = data.content; // Store the loaded messages
        });
    });

    beforeEach(() => {
        loginPage.open();
    });

    it("should prevent login if username or password is missing", () => {
        // Missing username
        validateFields({
            fields: { username: null, password: "somePassword" },
            expectedErrors: [messages.missingUsername] // Should be a string
        });
    
        // Refresh page to reset form
        cy.reload();
    
        // Missing password
        validateFields({
            fields: { username: credentials.username, password: null },
            expectedErrors: [messages.emptyPin] // Should be a string
        });
    });
    

    it("should display an error for invalid login credentials", () => {
        validateFields({
            fields: { username: "invalidUser", password: "invalidPassword" },
            expectedErrors: [messages.loginFailure] // Use the dynamic error message for login failure
        });
    });

    it("should display an error for invalid password with valid username", () => {
        validateFields({
            fields: { username: credentials.username, password: "invalidPassword" },
            expectedErrors: [messages.loginFailure] // Use the dynamic error message for login failure
        });
    });

    it("should log in successfully with valid credentials", () => {
        validateFields({
            fields: { username: credentials.username, password: credentials.password },
            expectedErrors: [messages.loginSuccess] // Use the expected success message
        });
    });
});
