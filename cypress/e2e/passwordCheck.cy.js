Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // impede que falhe o teste por erro não tratado
});

describe('Strong Password Generator', () => {
  beforeEach(() => {
  cy.visit('http://127.0.0.1:5500/'); // Altere para o endereço do seu servidor
});

  it('should display the default password placeholder on load', () => {
    cy.get('#senhaGerada').should('contain', '***********');
  });

  it('should generate a new password when "Gerar Senha" is clicked', () => {
    cy.get('#gerarSenha').click();
    cy.get('#senhaGerada')
      .invoke('text')
      .should('not.eq', '***********')
      .and('have.length', 12);
  });

  it('should copy the generated password to the clipboard', () => {
    cy.get('#gerarSenha').click();
    cy.get('#senhaGerada').invoke('text').as('generatedPassword');
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').as('writeText');
    });
    cy.get('#copiarSenha').click();
    cy.get('@generatedPassword').then((password) => {
      cy.get('@writeText').should('have.been.calledWith', password);
    });
  });
});