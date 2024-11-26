// cypress/pageObjects/userManagementPage.js

const generateRandomMobileNumber = () => "019" + Math.floor(Math.random() * 90000000 + 10000000);
const generateRandomEmail = () => `${Date.now()}@test.com`; // Unique email generation

// cypress/pageObjects/userManagementPage.js

class UserRegistrationPage {
    constructor() {
        // Define field selectors for input fields
        this.fullNameField = 'form > :nth-child(1) > div > input';
        this.mobileNumberField = ':nth-child(2) > div > input';
        this.emailField = ':nth-child(3) > div > input';
        this.addressField = ':nth-child(4) > div > .ant-input';
        this.userTypeRadio = ':nth-child(6) > .input-radio';
        this.genderRadio = ':nth-child(7) > .input-radio';
        this.datePickerInput = '.ant-calendar-picker-input';
        this.saveButton = '.btn'; // Replace with the correct save button selector
    }
    validateErrorMessage(fieldSelector, errorMessageSelector, errorMessage) {
        if (fieldSelector.includes('radio')) {
            // Ensure the radio button exists and is visible
            cy.get(`${fieldSelector} > input[type="radio"]`, { timeout: 15000 })
              .should('exist')  // Wait for the element to exist in the DOM
              .should('be.visible')  // Wait for the element to be visible
              .eq(0)  // Click the first radio button (adjust if necessary)
              .click();
        } else {
            // For input fields (input, textarea, select), clear the value to simulate an empty field
            cy.get(fieldSelector).clear(); // Clear the input field
        }
    
        // Trigger validation by clicking the save button
        cy.get(this.saveButton).click();
    
        // Validate the error message is visible
        cy.get(errorMessageSelector, { timeout: 10000 })
            .contains(errorMessage)
            .should('be.visible');
    }
        
    // Validate all required fields
    validateRequiredFields(requiredFields) {
        requiredFields.forEach(({ field, selector, errorMessage }) => {
            const fieldSelector = this[field];
            if (!fieldSelector) {
                throw new Error(`Field selector for '${field}' is not defined`);
            }
            this.validateErrorMessage(fieldSelector, selector, errorMessage);
        });
    }

    enterField(fieldSelector, value) {
        cy.get(fieldSelector).clear().type(value);
    }

    selectRadioOption(selector, optionIndex) {
        cy.get(`${selector} > :nth-child(${optionIndex}) > input`).click();
    }

    selectDateOfBirth() {
        cy.get(this.datePickerInput).click();
        cy.wait(500); // Wait for the date picker to load
        cy.get('.ant-calendar-today-btn').click();
    }

    clickSave() {
        cy.get(this.saveButton).click();
    }

    validateSuccessMessage(expectedMessage) {
        cy.contains(expectedMessage, { timeout: 10000 }).should('be.visible');
    }

    navToUserManagement() {
        cy.get('body').then(($body) => {
            if ($body.find('.item-navbar > .ant-btn:visible').length) {
                cy.get('.item-navbar > .ant-btn').click();
            }
            cy.contains('Setup').click();
            cy.contains('User Management').click();
        });
    }

    validateFormLabels(labels) {
        labels.forEach((label) => cy.contains(label).should('be.visible'));
    }

    registerUser(userType, successMessage,errorMessageSelector, errorMessage) {
        cy.fixture('testData').then((data) => {
            const userData = data[userType];
            const userTypeIndex = userType === 'maker' ? 1 : 2;
            const genderIndex = userData.gender === 'male' ? 1 : 2;

            const mobileNumber = generateRandomMobileNumber();
            const email = generateRandomEmail();

            this.enterField(this.fullNameField, userData.fullName);
            this.enterField(this.mobileNumberField, mobileNumber);
            this.enterField(this.emailField, email);
            this.enterField(this.addressField, userData.address);

            this.selectRadioOption(this.userTypeRadio, userTypeIndex);
            this.selectRadioOption(this.genderRadio, genderIndex);
            this.selectDateOfBirth();

            this.clickSave();
            this.validateSuccessMessage(userData.successMessage);
        });
    }
}

// Export an instance of the page object
export const userRegistrationPage = new UserRegistrationPage();
