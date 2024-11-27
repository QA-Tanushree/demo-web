import salaryFileUpload from "../pageObjects/salaryFileUpload";

describe('Checker Maker Registration Test', () => {
    beforeEach(() => {
        cy.login(); // Use the custom login command
    });

    it('should validate the presence of form labels and upload the salary file', function () {
        salaryFileUpload.salaryFileUpload();
    });
});
