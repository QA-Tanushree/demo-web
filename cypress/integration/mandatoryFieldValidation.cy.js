class userManagement {
  // Field selectors
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

  // Required fields and error details
  requiredFields = [
    { field: 'fullNameField', errorSelector: ':nth-child(1) > .error', errorMessage: 'Full Name is required' },
    { field: 'mobileNumberField', errorSelector: ':nth-child(2) > .error', errorMessage: 'Mobile Number is required' },
    { field: 'emailField', errorSelector: ':nth-child(3) > .error', errorMessage: 'Email is required' },
    { field: 'addressField', errorSelector: ':nth-child(4) > .error', errorMessage: 'Address is required' },
  ];

  // Method to fill the form
  fillForm({ fullName, mobile, email, address, userType, gender, date }) {
    if (fullName) cy.get(this.selectors.fullNameField).type(fullName);
    if (mobile) cy.get(this.selectors.mobileNumberField).type(mobile);
    if (email) cy.get(this.selectors.emailField).type(email);
    if (address) cy.get(this.selectors.addressField).type(address);

    // Handle radio button selection based on passed values
    this.selectRadioButton('userTypeRadio', userType);
    this.selectRadioButton('genderRadio', gender);

    if (date) this.selectDateOfBirth();
  }

  // Method to handle selecting a radio button
  selectRadioButton(radioGroup, value) {
    if (!value) return;
    const index = value === 'maker' || value === 'male' ? 1 : 2;
    cy.get(`${this.selectors[radioGroup]} > :nth-child(${index}) > input`).click();
  }

  // Method to handle the date picker
  selectDateOfBirth() {
    cy.get(this.selectors.datePickerInput).click();
    cy.get('.ant-calendar-today-btn').should('be.visible').click(); // Select today's date
  }

  // Method to submit the form
  submitForm() {
    cy.get(this.selectors.saveButton).click();
  }

  // Method to check required field validation
  checkRequiredFields({ userType, gender } = {}) {
    this.requiredFields.forEach(({ field, errorSelector, errorMessage }) => {
      const selector = this.selectors[field];

      // Handle radio button fields
      if (field === 'userTypeRadio' || field === 'genderRadio') {
        this.clearRadioButton(field);
      }

      // Optionally, pre-select valid values for userType and gender to avoid validation errors
      if (field === 'userTypeRadio' && userType) this.selectRadioButton('userTypeRadio', userType);
      if (field === 'genderRadio' && gender) this.selectRadioButton('genderRadio', gender);

      // Submit the form and check the error message
      this.submitForm();
      cy.get(errorSelector).should('be.visible').and('contain.text', errorMessage);
    });
  }

  // Helper to clear radio button selection
  clearRadioButton(radioGroup) {
    cy.get(`${this.selectors[radioGroup]} > :nth-child(1) > input`).should('not.be.checked');
    cy.get(`${this.selectors[radioGroup]} > :nth-child(2) > input`).should('not.be.checked');
  }

  // Method to check form submission success
  checkSuccess() {
    cy.url().should('include', '/success');
  }
}

export default new userManagement();
