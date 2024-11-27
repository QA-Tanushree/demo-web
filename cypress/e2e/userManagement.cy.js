import userManagement from "../pageObjects/userManagementPage";

describe('Checker Maker Registration Test', () => {
    beforeEach(() => {
        cy.login(); // Use the custom login command
    });

    it('should validate the presence of form labels', function () {
        userManagement.navToUserManagement();
        const labels = ['Full Name', 'Mobile Number', 'Email', 'Present Address', 'Date Of Birth', 'Gender', 'User Type'];
        userManagement.validateFormLabels(labels);
    });

    it('should register a user as a maker', function () {
        cy.fixture('activityContent').then((data) => {
            const makerCreateMessage = data.content.makerCreate;
            userManagement.navToUserManagement();
            userManagement.registerUser('maker', makerCreateMessage);
        });
    });

    it('should register a user as a checker', function () {
        cy.fixture('activityContent').then((data) => {
            const checkerCreateMessage = data.content.checkerCreate;
            userManagement.navToUserManagement();
            userManagement.registerUser('checker', checkerCreateMessage);
        });
    });

    it('should show validation errors for all mandatory fields when left empty', () => {
        userManagement.navToUserManagement();
        userManagement.validateRequiredFields();
    });
});
