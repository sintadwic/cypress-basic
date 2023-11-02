describe('template spec', () => {
  afterEach(() => {
    //reset database by calling php artisan
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed"
    );
  });
  beforeEach(() => {
    //reset database by calling php artisan
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed"
    );
    //arrange
    cy.visit('http://127.0.0.1:8000/')
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit('http://127.0.0.1:8000/user-management/user');
  });
  //possitive test case
  it('user can delete data', () => {
    //memakai .next
    //cy.get('.table td').contains('user').next().next().next().contains('Delete').click();
    //memakai .nextAll
    //cy.get('.table td').contains('user').nextAll().contains('Delete').click();
    //memakai .nextUntil
    //cy.get('.table td').contains('user').nextUntil('delete').contains('Delete').click();
    
    //act
    //memakai .find
    cy.get('.table td').contains('user').parent().find('button').contains('Delete').click();
   //make sure sweet alert visible
   cy.get('.swal-button-container').find('button').contains('OK').click();

    //assert
    //cy.get(':nth-child(3) > .text-right > .d-flex > .ml-2 > .btn').click();
    //cy.get(':nth-child(2) > .swal-button').click();
    cy.get('p').should('be.visible');
    cy.get('.alert')
      .should('be.visible')
      .and('have.class','alert-success')
      .contains('User Deleted Successfully');
      cy.get('.table').should('not.contain', 'user');
  });

  //possitive test case
  it('user can cancel delete data', () => {
    //cy.get(':nth-child(3) > .text-right > .d-flex > .ml-2 > .btn').click();
    //cy.get(':nth-child(1) > .swal-button').click();
    //cy.get('.table > tbody > :nth-child(3) > :nth-child(2)').contains('user');

    //act
    //memakai .find
    cy.get('.table td').contains('user').parent().find('button').contains('Delete').click();
    //make sure sweet alert visible
    cy.get('.swal-button-container').find('button').contains('Cancel').click();
    //assert
    cy.get('.table td')
      .contains('user')
      .should('be.visible')
  });

  it('user cant create new user because name is required', () => {});
  });