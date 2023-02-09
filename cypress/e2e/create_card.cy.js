describe('Assignment',()=>{
	before(()=>{
		// log into Trello board using our custom command
		cy.trelloLogin(Cypress.env('trello_username'), Cypress.env('trello_password'))
	})
	it('Create Card',()=>{
		cy.get('.boards-page-board-section:nth-child(2) .boards-page-board-section-list-item:first-child .board-tile').click().wait(500)

		//Add card in List A and B drag n drop it
		cy.log('Add card in List A and B drag n drop it')
		cy.get('.js-list:nth-child(4) .js-open-card-composer').click({force:true}).wait(100).then(()=>{
			cy.get('.list-card-composer-textarea').type('Card A {enter}')
		})
		cy.get('.js-list:nth-child(5) .js-open-card-composer').click({force:true}).wait(100).then(()=>{
			cy.get('.list-card-composer-textarea').type('Card B {enter}')
		})
		//Drag card A and drop to list B
		const dataTransfer = new DataTransfer();
		cy.get('.js-list:nth-child(4) .js-member-droppable:first-child').trigger("dragstart", { dataTransfer })
		cy.get('.js-list:nth-child(5) .js-member-droppable:first-child').trigger("drop", { dataTransfer })
		cy.get('.js-list:nth-child(5) .js-member-droppable:first-child').trigger("dragend").then((success) => {
			if(success==true){
				cy.log(assert.isTrue(success))
				//Get the x and y coordinates of the card that you moved. 
				cy.get('.js-list:nth-child(5) .js-member-droppable:first-child').then($el => {
					cy.log($el[0].getBoundingClientRect())
				})			
			}else{
					cy.log(assert.isFalse(success))
				}
			})
	})
	after(()=>{
		cy.deleteBoard()
		cy.trelloLogout()
	})
})
