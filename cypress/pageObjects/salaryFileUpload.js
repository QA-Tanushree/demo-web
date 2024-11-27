class SalaryFileUpload {
    // Selector for navigating to Salary File Upload section
    selectors = {
        uploadButton: '.upload-btn', // Assuming there's an upload button
        fileInput: 'input[type="file"]', // Assuming this is the file input field
        formLabels: '.form-label', // Selector for form labels (example, update as needed)
    };

    // Method to navigate to Salary File Upload page
    navToSalaryFileUpload() {
        cy.get('body').then(($body) => {
            if ($body.find('.item-navbar > .ant-btn:visible').length) {
                cy.get('.item-navbar > .ant-btn').click();
            }
            cy.contains('Disbursement Service').click();
            cy.contains('Salary Disbursement Request').click();
        });
    }

    // Method to upload a file
    uploadFile(filePath) {
        cy.get(this.selectors.fileInput).attachFile(filePath); // Using `cy.attachFile()` for file upload
    }

    // Method to validate form labels
    validateFormLabels(labels) {
        labels.forEach((label) => {
            cy.contains(label).should('be.visible'); // Check if form label is visible
        });
    }

    // Method to initiate the file upload process
    salaryFileUpload() {
        this.navToSalaryFileUpload(); // Navigate to Salary File Upload
        this.validateFormLabels(['Upload Salary File', 'File Name', 'Description']); // Replace with actual labels
        this.uploadFile('path/to/your/salary/file.csv'); // Provide the path to your salary file
    }
}

export default new SalaryFileUpload();
