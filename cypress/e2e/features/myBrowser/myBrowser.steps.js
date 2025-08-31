import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let capturedUrl;

Given("que eu acesso a página inicial do DemoQA", () => {
  cy.visit("https://demoqa.com/");
});

When("eu navego até Browser Windows", () => {
  cy.contains("Alerts, Frame & Windows").click();
  cy.contains("Browser Windows").click();
});

When("eu clico no botão para abrir uma nova janela", () => {
  // Intercepta window.open ANTES do clique
  cy.window().then((win) => {
    cy.stub(win, "open")
      .callsFake((url) => {
        capturedUrl = url;
        // Simula a navegação na mesma janela
        win.location.href = url;
      })
      .as("openStub");
  });

  // Clique no botão após o stub estar ativo
  cy.get("#windowButton").click();
});

Then("a nova janela deve ser aberta", () => {
  cy.get("@openStub").should("have.been.calledOnce");
  expect(capturedUrl, "A URL capturada não deve ser undefined").to.not.be
    .undefined;
});

Then("a URL da nova janela deve conter {string}", (expectedUrlPart) => {
  cy.log(`URL capturada (final): ${capturedUrl}`);
  expect(capturedUrl).to.include(expectedUrlPart);
  cy.url().should("include", expectedUrlPart);
});

Then("a página deve exibir o texto {string}", (expectedText) => {
  cy.get("#sampleHeading").should("contain", expectedText);
});
