// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

//cypress / support / e2e.js;
// Tratamento de erros
Cypress.on("uncaught:exception", (err, runnable) => {
  if (
    err.message.includes("Script error") ||
    err.message.includes("ResizeObserver") ||
    err.message.includes("google") ||
    err.message.includes("Non-Error promise rejection") ||
    err.message.includes("getMonth") ||
    err.message.includes("Cannot read properties of null") ||
    err.message.includes("Cannot read properties of undefined") ||
    err.message.includes("reading 'document'") ||
    err.message.includes("adplus") ||
    err.message.includes("ads")
  ) {
    return false;
  }

  return true;
});
