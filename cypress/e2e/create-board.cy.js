describe('Trello Authentication', () => {
  before(() => {
    // log into Trello board using our custom command
    cy.trelloLogin(Cypress.env('trello_username'), Cypress.env('trello_password'))
})
  it('Assignment',()=>{
    //Create a New Board
    cy.log('Create a New Board')
    cy.get('.boards-page-board-section-list [data-testid="create-board-tile"]').click()
    cy.get('[title="Blue"]').should('have.css','background-color', 'rgb(0, 121, 191)').click()
    cy.get('[data-testid="create-board-title-input"]').type('Demo List').should('have.attr','required').and('not.be.empty')
    cy.get('[data-testid="create-board-submit-button"]').contains('Create').click().wait(500)
    cy.go(-1).wait(500)
})
  after(()=>{
    cy.trelloLogout()
})
  
})