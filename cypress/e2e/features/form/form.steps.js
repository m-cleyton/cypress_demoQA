import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que eu acesso o DemoQA Practice Form", () => {
  cy.visit("https://demoqa.com/");
  cy.get(".card.mt-4.top-card").contains("Forms").click();
  cy.get(".element-list.collapse.show").contains("Practice Form").click();
});

When("eu preencho o campo First Name com {string}", (firstName) => {
  cy.get("#firstName").type(firstName);
});

When("eu preencho o campo Last Name com {string}", (lastName) => {
  cy.get("#lastName").type(lastName);
});

When("eu preencho o campo Email com {string}", (email) => {
  cy.get("#userEmail").type(email);
});

When("eu seleciono o gênero {string}", (gender) => {
  cy.get(`label[for="gender-radio-1"]`).click();
});

When("eu preencho o campo Mobile com {string}", (mobile) => {
  cy.get("#userNumber").type(mobile);
});

When(
  "eu seleciono a data de nascimento {string} {string} {string}",
  (day, month, year) => {
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__year-select").select(year);
    cy.get(".react-datepicker__month-select").select(month);
    cy.get(`.react-datepicker__day--0${day}`).click();

    cy.get("#dateOfBirthInput")
      .invoke("val")
      .then((val) => {
        expect(val).to.include(day); // dia
        expect(val).to.include(year); // ano
        expect(val).to.match(new RegExp(month.substring(0, 3))); // mês abreviado
      });
  }
);

When("eu seleciono a matéria {string}", (subject) => {
  cy.get("#subjectsContainer").click();
  cy.get("#subjectsInput").type(subject);
  cy.wait(500);
  cy.get("#subjectsInput").type("{downarrow}{enter}");
});

When("eu seleciono o hobbie {string}", (hobbie) => {
  cy.get('label[for="hobbies-checkbox-1"]').click();
});

When("eu faço upload do ficheiro {string}", (filePath) => {
  cy.get("#uploadPicture").selectFile(filePath);
});

When("eu preencho o campo Address com {string}", (address) => {
  cy.get("#currentAddress").type(address);
});

When("eu seleciono o estado {string}", (state) => {
  cy.get("#state").click();
  cy.get("#react-select-3-input").type(`${state}{enter}`);
});

When("eu seleciono a cidade {string}", (city) => {
  cy.get("#city").click();
  cy.get("#react-select-4-input").type(`${city}{enter}`);
});

When("eu submeto o formulário", () => {
  cy.get("#submit").click();
});

Then("o modal de confirmação deve aparecer", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get(".modal-header").should(
    "contain.text",
    "Thanks for submitting the form"
  );
});

Then("o modal deve conter os dados submetidos corretamente", () => {
  cy.get(".table-responsive").within(() => {
    cy.contains("td", "Student Name").next().should("contain.text", "Test QA");
    cy.contains("td", "Student Email")
      .next()
      .should("contain.text", "testqa@test.com");
    cy.contains("td", "Gender").next().should("contain.text", "Male");
    cy.contains("td", "Mobile").next().should("contain.text", "1199999999");
    cy.contains("td", "Date of Birth")
      .next()
      .should("contain.text", "15 August,1990");
  });
});
