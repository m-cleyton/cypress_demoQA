import {
  Given,
  When,
  Then,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

const registrosFaker = [];

Given("que eu acesso a página Web Tables no DemoQA", () => {
  cy.visit("https://demoqa.com/");
  cy.removeAds();
  cy.get(".category-cards").contains("Elements").click();
  cy.url().should("include", "/elements");
  cy.get(".left-pannel").contains("Web Tables").click();
  cy.url().should("include", "/webtables");
});

When("eu adiciono um novo registro com os dados:", (dataTable) => {
  const record = dataTable.hashes()[0];
  cy.get("#addNewRecordButton").click();
  cy.get(".modal-content").should("be.visible");
  cy.get("#firstName").type(record.firstName);
  cy.get("#lastName").type(record.lastName);
  cy.get("#userEmail").type(record.email);
  cy.get("#age").type(record.age);
  cy.get("#salary").type(record.salary);
  cy.get("#department").type(record.department);
  cy.get("#submit").click();
  cy.get(".modal-content").should("not.exist");
});

Then(
  "o registro {string} deve estar visível na tabela com os dados corretos",
  (firstName) => {
    cy.get(".rt-tbody").contains(".rt-tr", firstName).should("be.visible");
  }
);

Given("que eu tenho um registro com os dados:", (dataTable) => {
  const record = dataTable.hashes()[0];
  cy.get("#addNewRecordButton").click();
  cy.get("#firstName").type(record.firstName);
  cy.get("#lastName").type(record.lastName);
  cy.get("#userEmail").type(record.email);
  cy.get("#age").type(record.age);
  cy.get("#salary").type(record.salary);
  cy.get("#department").type(record.department);
  cy.get("#submit").click();
  cy.get(".rt-tbody").contains(".rt-tr", record.firstName).should("exist");
});

When(
  "eu edito o registro e altero o {string} para {string}",
  (field, newValue) => {
    cy.get(".rt-tbody")
      .find('span[id^="edit-record-"]')
      .first()
      .click({ force: true });
    cy.get(".modal-content").should("be.visible");
    if (field === "firstName") {
      cy.get("#firstName").clear().type(newValue);
    }
    cy.get("#submit").click();
    cy.get(".modal-content").should("not.exist");
  }
);

Then(
  "o registro {string} deve estar visível na tabela com sobrenome {string} e email {string}",
  (firstName, lastName, email) => {
    cy.get(".rt-tbody")
      .contains(".rt-tr", firstName)
      .should("contain", lastName)
      .and("contain", email);
  }
);

When("eu deleto o registro {string}", (firstName) => {
  cy.get(".rt-tbody")
    .contains(".rt-tr", firstName)
    .within(() => {
      cy.get('span[id^="delete-record-"]').click();
    });
});

Then(
  "o registro {string} não deve estar mais visível na tabela",
  (firstName) => {
    cy.get(".rt-tbody").should("not.contain", firstName);
  }
);

Given("que eu tenho múltiplos registros na tabela:", (dataTable) => {
  const records = dataTable.hashes();
  records.forEach((record) => {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(record.firstName);
    cy.get("#lastName").type(record.lastName);
    cy.get("#userEmail").type(record.email);
    cy.get("#age").type(record.age);
    cy.get("#salary").type(record.salary);
    cy.get("#department").type(record.department);
    cy.get("#submit").click();
    cy.get(".rt-tbody").contains(".rt-tr", record.firstName).should("exist");
  });
});

When("eu deleto todos os registros", () => {
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
});

Then("a tabela deve exibir {string}", (message) => {
  cy.get(".rt-noData").should("contain", message);
});

When("eu adiciono 12 novos registros gerados aleatoriamente", () => {
  for (let i = 0; i < 12; i++) {
    const record = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }).toString(),
      salary: faker.number.int({ min: 1000, max: 15000 }).toString(),
      department: faker.commerce.department(),
    };

    registrosFaker.push(record);

    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").clear().type(record.firstName);
    cy.get("#lastName").clear().type(record.lastName);
    cy.get("#userEmail").clear().type(record.email);
    cy.get("#age").clear().type(record.age);
    cy.get("#salary").clear().type(record.salary);
    cy.get("#department").clear().type(record.department);
    cy.get("#submit").click();

    cy.get(".rt-tbody").contains(".rt-tr", record.firstName).should("exist");
  }
});

Then("os 12 registros devem estar visíveis na tabela", () => {
  registrosFaker.forEach((record) => {
    cy.get(".rt-tbody").contains(".rt-tr", record.email).should("exist");
  });
  cy.log("Todos os 12 registros foram criados com sucesso usando Faker!");
});

// --- Hook After: Deleta todos os registros visíveis ao final ---
After(() => {
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
  registrosFaker.length = 0;
  cy.log("Todos os registros foram deletados ao final do cenário");
});
