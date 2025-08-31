//TESTE API
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let username, password, userId, token, selectedIsbns;
let flowLogs = []; // array que vai acumular todos os logs

function logAction(action, response) {
  flowLogs.push({ action, response });
}

Given("I create a new user", () => {
  username = `test_user_${Date.now()}`;
  password = "Password123!";

  cy.request("POST", "/Account/v1/User", { userName: username, password }).then(
    (res) => {
      expect(res.status).to.eq(201);
      userId = res.body.userID;

      logAction("createUser", {
        userID: userId,
        username,
        books: [],
      });
    }
  );
});

Given("I generate a token", () => {
  cy.request("POST", "/Account/v1/GenerateToken", {
    userName: username,
    password,
  }).then((res) => {
    expect(res.status).to.eq(200);
    token = res.body.token;

    logAction("generateToken", res.body);
  });
});

Given("I am authorized", () => {
  cy.request("POST", "/Account/v1/Authorized", {
    userName: username,
    password,
  }).then((res) => {
    expect(res.status).to.eq(200);

    logAction("isAuthorized", true);
  });
});

When("I rent 2 books", () => {
  cy.request("GET", "/BookStore/v1/Books").then((res) => {
    expect(res.status).to.eq(200);
    selectedIsbns = res.body.books.slice(0, 2).map((b) => b.isbn);

    logAction("getAllBooks", res.body);

    cy.request({
      method: "POST",
      url: "/BookStore/v1/Books",
      headers: { Authorization: `Bearer ${token}` },
      body: {
        userId,
        collectionOfIsbns: selectedIsbns.map((isbn) => ({ isbn })),
      },
    }).then((res2) => {
      expect(res2.status).to.eq(201);

      logAction("rentBooks", {
        books: selectedIsbns.map((isbn) => ({ isbn })),
      });
    });
  });
});

Then("the user should have 2 books rented", () => {
  cy.request({
    method: "GET",
    url: `/Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.books).to.have.length(2);

    logAction("getUserBooks", res.body);

    // Vou gravar meu json do log
    cy.then(() => {
      cy.task("writeLog", {
        fileName: "flowLog.json",
        content: JSON.stringify(flowLogs, null, 2),
      });
    });
  });
});
