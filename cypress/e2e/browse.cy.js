/* eslint-disable no-undef */
describe("Browse all section", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should have proper text", () => {
    cy.get("h2").contains(/all creators assets are at your fingertips/i);
    cy.get("h3").contains(/welcome to the new yt shops/i);
  });
  it("clicking on browse all category will go to specific page", () => {
    cy.get("button")
      .contains(/browse all category/i)
      .click();
    cy.location("pathname").should("equal", "/category-data");
    cy.url().should("include", "/category-data?category=All");
  });
  it("should have a visible and existent image", () => {
    cy.get('[data-test="browse-section-image"]').should("be.visible");
    cy.get('[data-test="browse-section-image"]').should(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
      expect($img[0].naturalHeight).to.be.greaterThan(0);
    });
  });
});
