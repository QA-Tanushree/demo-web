// cypress/e2e/userManagement.cy.js
import { userRegistrationPage} from "../pageObjects/userManagementPage";
import userManagementPage from '../integration/mandatoryFieldValidation.cy';

describe('Checker Maker Registration Test', () => {

    beforeEach(() => {
        cy.login(); // Use the custom login command
    });

    it('should validate the presence of form labels', function() {
        userRegistrationPage.navToUserManagement();
        const labels = ['Full Name', 'Mobile Number', 'Email', 'Present Address', 'Date Of Birth', 'Gender', 'User Type'];
        userRegistrationPage.validateFormLabels(labels);
    });

    it('should register a user as a maker', function() {
        cy.fixture('activityContent').then((data) => {
            // Access the success message directly from the fixture
            const makerCreateMessage = data.content.makerCreate;
            userRegistrationPage.navToUserManagement();
            userRegistrationPage.registerUser('maker', makerCreateMessage);
        });
    });

    it('should register a user as a checker', function() {
        cy.fixture('activityContent').then((data) => {
            // Access the success message directly from the fixture
            const checkerCreateMessage = data.content.checkerCreate;
            userRegistrationPage.navToUserManagement();
            userRegistrationPage.registerUser('checker', checkerCreateMessage);
        });
    });
    it('should show validation errors for all mandatory fields when left empty', () => {
        userRegistrationPage.navToUserManagement();
        userManagementPage.submitForm();
        userManagementPage.checkRequiredFields();
      });
});
