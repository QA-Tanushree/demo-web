///<reference types="cypress" />
import { loginPage } from "../pageObjects/loginPage";
import { dashboardPage } from "../pageObjects/dashboardPage";
import credentials from '../fixtures/userCredentials.json';

describe("E2E: Dashboard Navigation", () => {
    beforeEach(() => {
        loginPage.open();
        cy.login(credentials.validUser.username, credentials.validUser.password);
        dashboardPage.verifyDashboardLoaded();
    });

    it("logs out successfully", () => {
        dashboardPage.logout();
        cy.url().should('include', '/login'); // Adjust as necessary
    });
});
