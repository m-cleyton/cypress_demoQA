import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const performDragAndDrop = (sourceText, targetText) => {
  cy.get(".vertical-list-container .list-group-item-action")
    .contains(sourceText)
    .then(($source) => {
      cy.get(".vertical-list-container .list-group-item-action")
        .contains(targetText)
        .then(($target) => {
          const targetRect = $target[0].getBoundingClientRect();

          const dropX = targetRect.left + targetRect.width / 2;
          const dropY = targetRect.top + targetRect.height / 2;

          cy.wrap($source).trigger("mousedown", { which: 1 }).wait(100);

          cy.wrap($target)
            .trigger("mousemove", { clientX: dropX, clientY: dropY })
            .wait(100);

          cy.document().trigger("mouseup", { force: true });
          cy.wait(500);
        });
    });
};

Given("que eu acesso a página inicial do DemoQA", () => {
  cy.visit("https://demoqa.com/");
  cy.removeAds();
});

When("eu navego para Interactions e clico em Sortable", () => {
  cy.get(".category-cards").contains("Interactions").click();
  cy.url().should("include", "/interaction");
  cy.get(".left-pannel").contains("Sortable").click();
  cy.url().should("include", "/sortable");
});

Then("a lista de itens deve estar visível", () => {
  cy.get(".vertical-list-container").should("be.visible");
});

Given("que eu acesso diretamente a página Sortable", () => {
  cy.visit("https://demoqa.com/sortable");
  cy.removeAds();
});

When("eu reordeno os itens da lista", () => {
  const expectedSortedOrder = ["One", "Two", "Three", "Four", "Five", "Six"];
  const currentOrder = [];

  cy.get(".vertical-list-container .list-group-item-action")
    .each(($el) => {
      currentOrder.push($el.text());
    })
    .then(() => {
      const isAlreadySorted =
        JSON.stringify(currentOrder) === JSON.stringify(expectedSortedOrder);

      if (!isAlreadySorted) {
        performDragAndDrop("One", "Three");
        performDragAndDrop("Two", "Three");
        performDragAndDrop("Three", "Four");
      }
    });
});

Then("os itens devem estar em ordem crescente {string}", (expectedOrder) => {
  const expectedArray = expectedOrder.split(",").map((item) => item.trim());
  cy.get(".vertical-list-container .list-group-item-action").each(
    ($el, index) => {
      cy.wrap($el).should("contain.text", expectedArray[index]);
    }
  );
});
