const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
Cypress.Commands.add('trelloLogout', () => {
  	cy.get('[data-testid="header-member-menu-button"]').click()
  	cy.get('[data-testid="account-menu-logout"]').contains('Log out').click().wait(200)
	cy.origin('https://id.atlassian.com', () => {
	  cy.get('#logout-submit').contains('Log out').click()
	})
})
Cypress.Commands.add('deleteBoard',()=>{
  cy.get('[aria-label="Show menu"]').click()
  cy.get('.js-open-more').contains(' More').click()
  cy.get('.js-close-board').contains(' Close board…').click().wait(500)
  cy.get('.js-confirm').should('have.value','Close').click().wait(500)
  cy.get('.js-react-root [data-testid="close-board-delete-board-button"]').contains('Permanently delete board').click()	
  cy.get('[data-testid="close-board-delete-board-confirm-button"]').contains('Delete').click().wait(500)
})
// require('@4tw/cypress-drag-drop')
