// /// <reference types="cypress" />

// describe("DemoQA Bookstore API Flow", () => {
//   it("Full flow: create user, generate token, rent books, log details", () => {
//     const timestamp = Date.now();
//     const username = `test_user_${timestamp}`;
//     const password = "Password123!";
//     let userId, token, selectedIsbns;

//     // 1️⃣ Criar usuário
//     cy.request({
//       method: "POST",
//       url: "/Account/v1/User",
//       body: { userName: username, password },
//       failOnStatusCode: false,
//     }).then((res) => {
//       expect(res.status).to.eq(201);
//       userId = res.body.userID;
//       cy.task("logToFile", { action: "createUser", response: res.body });
//     });

//     // 2️⃣ Gerar token
//     cy.request({
//       method: "POST",
//       url: "/Account/v1/GenerateToken",
//       body: { userName: username, password },
//       failOnStatusCode: false,
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       token = res.body.token;
//       cy.task("logToFile", { action: "generateToken", response: res.body });
//     });

//     // 3️⃣ Confirmar autorização
//     cy.request({
//       method: "POST",
//       url: "/Account/v1/Authorized",
//       body: { userName: username, password },
//       failOnStatusCode: false,
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       cy.task("logToFile", { action: "isAuthorized", response: res.body });
//     });

//     // 4️⃣ Listar todos os livros
//     cy.request({
//       method: "GET",
//       url: "/BookStore/v1/Books",
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       const books = res.body.books || [];
//       selectedIsbns = books.slice(0, 2).map((b) => b.isbn);
//       cy.task("logToFile", { action: "getAllBooks", response: res.body });
//     });

//     // 5️⃣ Alugar livros
//     cy.then(() => {
//       if (!selectedIsbns || !selectedIsbns.length) {
//         throw new Error("No books available to rent");
//       }

//       cy.request({
//         method: "POST",
//         url: "/BookStore/v1/Books",
//         headers: { Authorization: `Bearer ${token}` },
//         body: {
//           userId,
//           collectionOfIsbns: selectedIsbns.map((isbn) => ({ isbn })),
//         },
//       }).then((res) => {
//         expect(res.status).to.eq(201);
//         cy.task("logToFile", { action: "rentBooks", response: res.body });
//       });
//     });

//     // 6️⃣ Obter detalhes do usuário
//     cy.then(() => {
//       cy.request({
//         method: "GET",
//         url: `/Account/v1/User/${userId}`,
//         headers: { Authorization: `Bearer ${token}` },
//       }).then((res) => {
//         expect(res.status).to.eq(200);
//         cy.task("logToFile", { action: "getUserBooks", response: res.body });
//       });
//     });
//   });
// });
