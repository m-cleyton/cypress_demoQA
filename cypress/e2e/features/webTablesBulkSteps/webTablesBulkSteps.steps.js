import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("eu estou na página {string}", (pageName) => {
  cy.visit("https://demoqa.com/");
  cy.removeAds();

  // Navegar para a página correta
  if (pageName === "Web Tables") {
    cy.get(".category-cards").contains("Elements").click();
    cy.url().should("include", "/elements");
    cy.get(".left-pannel").contains("Web Tables").click();
    cy.url().should("include", "/webtables");
  }
  console.log(`Navegado para a página ${pageName}.`);
});

When("eu crio {string} novos registros", (count, dataTable) => {
  const recordsToCreate = dataTable.hashes();
  console.log(`🎯 Criando ${count} registros.`);

  recordsToCreate.forEach((record, index) => {
    console.log(
      `Criando registro ${index + 1}: ${record["First Name"]} ${
        record["Last Name"]
      }`
    );
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(record["First Name"]);
    cy.get("#lastName").type(record["Last Name"]);
    cy.get("#userEmail").type(record["Email"]);
    cy.get("#age").type(record["Age"]);
    cy.get("#salary").type(record["Salary"]);
    cy.get("#department").type(record["Department"]);
    cy.get("#submit").click();
    cy.get(".modal-content").should("not.exist");
    cy.wait(100);
  });
});

When("eu deleto todos os registros visíveis na tabela", () => {
  console.log("🎯 Deletando todos os registros visíveis.");

  const deleteAllRecords = () => {
    cy.get("body").then(($body) => {
      const deleteButtons = $body.find('[id^="delete-record-"]');
      if (deleteButtons.length > 0) {
        cy.get('[id^="delete-record-"]').first().click();
        cy.wait(300);
        deleteAllRecords();
      }
    });
  };

  deleteAllRecords();
  console.log("Todos os registros foram deletados.");
});

// THEN
Then("os {string} novos registros devem estar visíveis na tabela", (count) => {
  console.log(`🎯 Verificando ${count} registros recém-criados.`);

  cy.get(".rt-tbody").should("be.visible");

  cy.get(".rt-tbody").should("not.contain", "No rows found");

  cy.get(".rt-tbody .rt-tr-group").then(($rows) => {
    const realRows = Array.from($rows).filter((row) => {
      const $row = Cypress.$(row);
      const hasData = !$row.find(".rt-tr").hasClass("-padRow");
      return hasData;
    });

    console.log(`Linhas reais (não padding) encontradas: ${realRows.length}`);

    expect(realRows.length).to.equal(10);
  });

  cy.get(".rt-tbody").should("contain.text", "john@example.com");
  cy.get(".rt-tbody").should("contain.text", "jane@example.com");
  cy.get(".rt-tbody").should("contain.text", "r1@example.com");

  console.log(`Registros verificados na tabela.`);
});

Then("a tabela deve estar vazia", () => {
  console.log("Verificando se a tabela está vazia.");
  cy.get(".rt-noData").should("contain", "No rows found");
  console.log("Tabela está vazia.");
});
