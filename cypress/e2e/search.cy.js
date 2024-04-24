/* eslint-disable no-undef */
describe("search on category landing page", () => {
  beforeEach(() => {
    cy.visit("/category-data");
  });
  it("user can search with valid input", () => {
    cy.getByData("category-search").type("big{enter}");
    cy.url().should("include", "searchTerm=big");
    cy.wait(2000);
    cy.getByData("category-search").clear().type("mango{enter}");
    cy.url().should('include', 'searchTerm=mango');
    cy.wait(2000);
  });
  it.only("user can't search with invalid input", () => {
    cy.getByData("category-search").type("<script>console.log(hello)</script>");
    cy.url().should('not.include', 'searchTerm="<script>console.log(hello)</script>"');
    cy.wait(200);
    cy.getByData("category-search").clear().type(123454);
    cy.url().should('not.include', 'searchTerm="12345"');
  })
});
