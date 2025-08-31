import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que eu acesso a página inicial do DemoQA", () => {
  cy.visit("https://demoqa.com/");
  cy.removeAds();
});

When("eu navego até a seção Progress Bar", () => {
  cy.get(".category-cards").contains("Widgets").click();
  cy.url().should("include", "/widgets");

  cy.get(".left-pannel").contains("Progress Bar").click();
  cy.url().should("include", "/progress-bar");
});

Then("a barra de progresso deve iniciar em {string}", (initialValue) => {
  cy.get("#progressBar").should("be.visible").should("contain", initialValue);
});

When("eu clico em Start e paro antes de 25%", () => {
  cy.get("#startStopButton").should("contain.text", "Start").click();

  cy.wait(1000);

  cy.get("#startStopButton").should("contain.text", "Stop").click();

  cy.get("#startStopButton").should("contain.text", "Start");
});

Then("a barra deve estar menor que 25%", () => {
  cy.get("#progressBar")
    .invoke("text")
    .then((text) => {
      const percent = parseInt(text.replace("%", ""));
      cy.log(`Parou em: ${percent}%`);
      expect(percent).to.be.lessThan(25);
    });
});

When("eu clico em Start novamente até 100%", () => {
  cy.get("#startStopButton").should("contain.text", "Start").click();
});

Then("a barra deve exibir {string}", (finalValue) => {
  cy.get("#progressBar", { timeout: 50000 }).should("contain", finalValue);
});

When("eu clico em Reset", () => {
  cy.get("#resetButton")
    .should("be.visible")
    .should("contain.text", "Reset")
    .click();
  cy.wait(500);
});

Then("a barra deve voltar para {string}", (resetValue) => {
  cy.get("#progressBar", { timeout: 10000 }).should("contain", resetValue);
});
