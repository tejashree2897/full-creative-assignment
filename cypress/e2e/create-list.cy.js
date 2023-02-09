describe('Assignment',()=>{
	before(()=>{
	// log into Trello board using our custom command
		cy.trelloLogin(Cypress.env('trello_username'), Cypress.env('trello_password'))
	})
	it('Create a list A and list B on board',()=>{
		cy.get('.boards-page-board-section:nth-child(2) .boards-page-board-section-list-item:first-child .board-tile').click().wait(500)
		cy.get('#board').then(($el) => {
  			cy.log(Cypress.dom.isScrollable($el) + 'Board is scrollable') // true
  			cy.get('#board').scrollTo('right')
  		})
		cy.log('Create a list List A and List B')
    	//List A
		cy.get('#board .js-add-list .js-open-add-list').click({force:true}).wait(100).then(()=>{
			cy.get('.list-name-input').type('List A {enter}')
		})
  		//List B
		cy.get('.list-name-input').type('List B {enter}').wait(200)
	})
	after(()=>{
		cy.trelloLogout()
	})
})