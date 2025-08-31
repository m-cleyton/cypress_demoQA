// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

// Preencher o formulário completo
Cypress.Commands.add("fillAutomationForm", (userData) => {
  // Preencher nome e sobrenome
  cy.get('[placeholder="First Name"]').clear().type(userData.firstName);
  cy.get('[placeholder="Last Name"]').clear().type(userData.lastName);

  // Preencher email
  cy.get('[placeholder="name@example.com"]').clear().type(userData.email);

  // Selecionar gênero
  cy.get(`label[for="gender-radio-${userData.gender}"]`).click();

  // Preencher número de telefone
  cy.get('[placeholder="Mobile Number"]').clear().type(userData.mobile);

  // Preencher data de nascimento
  cy.get("#dateOfBirthInput").click();
  cy.get("#dateOfBirthInput").clear().type(userData.dateOfBirth);
  cy.get("#dateOfBirthInput").type("{enter}");

  // Selecionar matéria
  cy.get(".subjects-auto-complete__value-container").click();
  cy.get("#subjectsInput").type(userData.subject);
  cy.get("#subjectsInput").type("{downarrow}{enter}");

  // Selecionar hobby
  cy.get(`label[for="${userData.hobby}-checkbox"]`).click();

  // Upload de arquivo
  if (userData.fileName) {
    cy.get("#uploadPicture").selectFile(
      `cypress/fixtures/${userData.fileName}`
    );
  }

  // Preencher endereço atual
  cy.get("#currentAddress").clear().type(userData.currentAddress);

  // Selecionar estado
  cy.get("#state").click();
  cy.get("#react-select-3-input").type(userData.state);
  cy.get("#react-select-3-input").type("{downarrow}{enter}");

  // Selecionar cidade
  cy.get("#city").click();
  cy.get("#react-select-4-input").type(userData.city);
  cy.get("#react-select-4-input").type("{downarrow}{enter}");
});

// Fechar o modal de sucesso
Cypress.Commands.add("closeSuccessModal", () => {
  cy.get("#closeLargeModal").should("be.visible").click();
});

//Verificar dados no modal de confirmação
Cypress.Commands.add("verifySubmissionModal", (userData) => {
  cy.get(".modal-content").should("be.visible");
  cy.get(".modal-header .modal-title").should(
    "contain",
    "Thanks for submitting the form"
  );

  // Verificar alguns dados no modal
  cy.get(".table-responsive").within(() => {
    cy.contains("Student Name")
      .parent()
      .should("contain", `${userData.firstName} ${userData.lastName}`);
    cy.contains("Student Email").parent().should("contain", userData.email);
    cy.contains("Mobile").parent().should("contain", userData.mobile);
  });
});

// Comando para remover ads que podem interferir nos testes
//Não esquecer que tenho que validar melhor, site com muitas requisições de popups
Cypress.Commands.add("removeAds", () => {
  const adsSelectors = [
    "#adplus-anchor",
    '[id*="google_ads"]',
    ".adsbygoogle",
    '[id*="ads"]',
    ".ad-container",
    ".advertisement",
  ];

  adsSelectors.forEach((selector) => {
    cy.get("body").then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).invoke("remove");
      }
    });
  });

  cy.get("body").then(($body) => {
    // Procurar anuncios e fecha-los caso existam
    if ($body.find('iframe[src*="ads-iframe"]').length) {
      cy.get('iframe[src*="ads-iframe"]')
        .its("0.contentDocument.body")
        .then(($body) => {
          if ($body.find("#adplus-Interstitial").length) {
            cy.wrap($body)
              .find('[aria-label="Close ad"]')
              .click({ force: true });
          }
        });
    }
  });

  // Aguardar um pouco após tentar remover os anuncios do demoqa
  cy.wait(300);
});

// Validar campos obrigatórios
Cypress.Commands.add("validateRequiredFields", () => {
  cy.get("#firstName").should("have.class", "field-error");
  cy.get("#lastName").should("have.class", "field-error");
  cy.get("#userEmail").should("have.class", "field-error");
  cy.get("#userNumber").should("have.class", "field-error");
});

// Preencher apenas campos obrigatórios
Cypress.Commands.add("fillRequiredFields", (userData) => {
  cy.get("#firstName").type(userData.firstName);
  cy.get("#lastName").type(userData.lastName);
  cy.get("#userEmail").type(userData.email);
  cy.get(`label[for="gender-radio-${userData.gender}"]`).click();
  cy.get("#userNumber").type(userData.mobile);
});

//Verificar dados específicos no modal
Cypress.Commands.add("verifyModalData", (expectedData) => {
  cy.get(".table-responsive").within(() => {
    if (expectedData.studentName) {
      cy.contains("td", "Student Name")
        .next()
        .should("contain.text", expectedData.studentName);
    }
    if (expectedData.email) {
      cy.contains("td", "Student Email")
        .next()
        .should("contain.text", expectedData.email);
    }
    if (expectedData.gender) {
      cy.contains("td", "Gender")
        .next()
        .should("contain.text", expectedData.gender);
    }
    if (expectedData.mobile) {
      cy.contains("td", "Mobile")
        .next()
        .should("contain.text", expectedData.mobile);
    }
    if (expectedData.dateOfBirth) {
      cy.contains("td", "Date of Birth")
        .next()
        .should("contain.text", expectedData.dateOfBirth);
    }
    if (expectedData.hobbies) {
      cy.contains("td", "Hobbies")
        .next()
        .should("contain.text", expectedData.hobbies);
    }
    if (expectedData.picture) {
      cy.contains("td", "Picture")
        .next()
        .should("contain.text", expectedData.picture);
    }
    if (expectedData.address) {
      cy.contains("td", "Address")
        .next()
        .should("contain.text", expectedData.address);
    }
  });
});

// cypress/support/commands.js
