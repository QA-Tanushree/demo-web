const generateRandomMobileNumber = () => "019" + Math.floor(Math.random() * 90000000 + 10000000);
const generateRandomEmail = () => `${Date.now()}@test.com`; // Unique email generation

class UserManagement {
    selectors = {
        fullNameField: 'form > :nth-child(1) > div > input',
        mobileNumberField: ':nth-child(2) > div > input',
        emailField: ':nth-child(3) > div > input',
        addressField: ':nth-child(4) > div > .ant-input',
        userTypeRadio: ':nth-child(6) > .input-radio',
        genderRadio: ':nth-child(7) > .input-radio',
        datePickerInput: '.ant-calendar-picker-input',
        saveButton: '.btn',
    };

    requiredFields = [
        { field: 'fullNameField', errorSelector: ':nth-child(1) > .error', errorMessage: 'Full Name is required' },
        { field: 'mobileNumberField', errorSelector: ':nth-child(2) > .error', errorMessage: 'Mobile Number is required' },
        { field: 'emailField', errorSelector: ':nth-child(3) > .error', errorMessage: 'Email is required' },
        { field: 'addressField', errorSelector: ':nth-child(4) > .error', errorMessage: 'Address is required' },
    ];

    navToUserManagement() {
        cy.get('body').then(($body) => {
            if ($body.find('.item-navbar > .ant-btn:visible').length) {
                cy.get('.item-navbar > .ant-btn').click();
            }
            cy.contains('Setup').click();
            cy.contains('User Management').click();
        });
    }

    fillForm({ fullName, mobile, email, address, userType, gender, date }) {
        if (fullName) cy.get(this.selectors.fullNameField).type(fullName);
        if (mobile) cy.get(this.selectors.mobileNumberField).type(mobile);
        if (email) cy.get(this.selectors.emailField).type(email);
        if (address) cy.get(this.selectors.addressField).type(address);

        this.selectRadioButton('userTypeRadio', userType); // Handles Maker/Checker
        this.selectRadioButton('genderRadio', gender); // Handles Male/Female

        if (date) this.selectDateOfBirth();
    }

    selectRadioButton(radioGroup, value) {
        // Explicit nth-child selection
        const index = value === 'maker' ? 2 : value === 'checker' ? 1 : value === 'male' ? 1 : 2;
        cy.get(`${this.selectors[radioGroup]} > :nth-child(${index}) > input`).click();
    }

    selectDateOfBirth() {
        cy.get(this.selectors.datePickerInput).click();
        cy.wait(500);
        cy.get('.ant-calendar-today-btn').should('be.visible').click();
    }

    submitForm() {
        cy.get(this.selectors.saveButton).click();
    }

    validateRequiredFields() {
        this.requiredFields.forEach(({ field, errorSelector, errorMessage }) => {
            const selector = this.selectors[field];
            cy.get(selector).clear();
            this.submitForm();
            cy.get(errorSelector).should('be.visible').and('contain.text', errorMessage);
        });
    }

    // Validate Success Message
    validateSuccessMessage(expectedMessage) {
        cy.contains(expectedMessage, { timeout: 10000 }).should('be.visible');
    }

    // Validate Form Labels
    validateFormLabels(labels) {
        labels.forEach((label) => cy.contains(label).should('be.visible'));
    }

    // Register User
    registerUser(userType, successMessage) {
        cy.fixture('testData').then((data) => {
            const userData = data[userType];

            const mobileNumber = generateRandomMobileNumber();
            const email = generateRandomEmail();

            cy.log(`Registering user: ${userType}`);
            this.fillForm({
                fullName: userData.fullName,
                mobile: mobileNumber,
                email,
                address: userData.address,
                userType, // Pass 'maker' or 'checker'
                gender: userData.gender, // Pass 'male' or 'female'
                date: true,
            });

            this.submitForm();
            this.validateSuccessMessage(successMessage);
        });
    }
}

export default new UserManagement();
