describe('User can login to sytem', () => {
  //positive test case
  it('user can login with valid username and password', () => {
    //arrange
    cy.visit('http://localhost:8000/');
    //select elemen html yang dibutuhkan
    //kalo sudah dapat elementnya mau diapakan?
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    //select elemen html yang dibutuhkan
    //kalo sudah dapat elementnya mau diapakan?
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    //select elemen html yang dibutuhkan
    //lakukan assertion sesuai test case
    //assert
    cy.get('.nav-link > .d-sm-none').should('have.text', 'Hi, SuperAdmin');
  });

  //negative test
  it('user cannot login with valid username and wrong password', () => {
    //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password-salah');
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should('have.text', 'These credentials do not match our records.');
  });

  //negative test
  it('user cannot login with wrong username and valid password', () => {
    //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin123@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should('have.text', 'These credentials do not match our records.');
  });
  
  //negative test
  it('user cannot login with empty username and correct password', () => {
    //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should('have.text', 'The email field is required.');
  }); 

  //negative test
  it('user cannot login with correct username and empty password', () => {
    //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should('have.text', 'The password field is required.');
  });

  //negative test
  it('user cannot login with wrong username and wrong password', () => {
    //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin123@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password-salah');
    cy.get('.btn').click();
    //assert
    cy.get('.invalid-feedback').should('have.text', 'These credentials do not match our records.');
  });

  //negative test
  it.only('user cannot login with empty username and empty password', () => {
    //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get('.btn').click();
    //assert
    cy.get(':nth-child(2) > .invalid-feedback').should('have.text', 'The email field is required.');
    cy.get(':nth-child(3) > .invalid-feedback').should('have.text', 'The password field is required.');
  });
});