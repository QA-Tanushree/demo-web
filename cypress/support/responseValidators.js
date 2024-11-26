//cypress\support\responseValidators.js
export function validateModalMessage(selector, expectedMessage) {
    cy.get(selector).should('contain.text', expectedMessage);
}

export function validateToastMessage(expectedMessage) {
    cy.get('.ant-message-custom-content > span', { timeout: 10000 }) // Wait up to 10 seconds
        .should('be.visible')
        .should('contain.text', expectedMessage)
        .then(() => {
            cy.log(`Toast message validated: "${expectedMessage}"`);
        })
        .catch((error) => {
            cy.log(`Expected toast message "${expectedMessage}" not found.`);
            throw error;
        });
}