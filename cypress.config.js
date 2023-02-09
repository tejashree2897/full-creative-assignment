const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
  pageLoadTimeout:100000,
  env: {
    trello_name:'Tejashree Kamble',
    trello_username:'tejashree2897@gmail.com',
    trello_password:'Teju@2897',
    base_url:'https://trello.com',
    sub_url:'/u/tejashreekamble3/boards'
  },
});
