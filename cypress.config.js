const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_ENV === 'live'
    ? 'https://live.dmoney.com.bd/salary-disbursement-portal/signin'
    : 'https://sandbox.dmoney.com.bd:8181/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
