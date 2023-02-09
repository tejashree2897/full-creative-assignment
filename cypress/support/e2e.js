import './commands'

function trelloLogin(username, password) {
  cy.visit(Cypress.env('base_url'))
  cy.get('header div > [href="/login"][data-uuid]').click()

  // Login to your TRELLO.
  cy.get('#login-form #user').type(username, {
        log: false,
      })
      cy.get('#login-form #login').click().wait(500)
  // the origin may go to atlassian.com
  cy.origin(
    'https://id.atlassian.com',
    {
      args: {
        password,
      },
    },
    ({ password }) => {
      cy.get('#password').type(password, {
        log: false,
      })
      cy.get('#login-submit').click()
    }
  )

  // Ensure trello has redirected us back to the app with our logged in user.
  cy.url().should('equal', Cypress.env('base_url') + Cypress.env('sub_url'))
  cy.get('[data-testid="header-member-menu-button"]').click()
  cy.get('[data-testid="header-member-menu-popover"]').contains(Cypress.env('trello_name'))
  cy.get('[data-testid="header-member-menu-popover"]').contains(Cypress.env('trello_username'))
}

Cypress.Commands.add('trelloLogin', (username, password) => {
  const log = Cypress.log({
    displayName: 'TRELLO Login',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })
  log.snapshot('before')
  trelloLogin(username, password)
  log.snapshot('after')
  log.end()
})