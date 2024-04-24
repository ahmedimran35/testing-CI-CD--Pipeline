/* eslint-disable no-undef */
describe("Top Categories", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("has proper heading", () => {
    cy.get("h2").contains(/top categories/i);
  });
  it("clicking on template category will show design templates", () => {
    cy.get('[data-test="top-category-0"]').as("first-category");
    cy.get("@first-category").contains(/template/gi);
    cy.get("@first-category").find("img").should("be.visible");
    cy.get("@first-category")
      .find("img")
      .should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      });
    cy.wait(1000);
    cy.get("@first-category").click();
    cy.url().should("include", "/category-data?category=design-template");
    cy.wait(100);
  });
  it("clicking on stock photos will show data from stock photos", () => {
    cy.get('[data-test="top-category-1"]').as("second-category");
    cy.get("@second-category").contains(/stock photos/i);
    cy.get("@second-category").find("img").should("be.visible");
    cy.get("@second-category")
      .find("img")
      .should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      });
    cy.wait(1000);
    cy.get("@second-category").click();
    cy.url().should("include", "/category-data?category=stock-photos");
    cy.wait(100);
  });
  it("clicking on icons will show data from icons", () => {
    cy.get('[data-test="top-category-2"]').as("third-category");
    cy.get("@third-category").contains(/icons/i);
    cy.get("@third-category").find("img").should("be.visible");
    cy.get("@third-category")
      .find("img")
      .should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      });
    cy.wait(1000);
    cy.get("@third-category").click();
    cy.url().should("include", "/category-data?category=icon");
    cy.wait(100);
  });
  it("clicking softwares & tools will show data from software and tools", () => {
    cy.get('[data-test="top-category-3"]').as("fourth-category");
    cy.get("@fourth-category").contains(/softwares & tools/i);
    cy.get("@fourth-category").find("img").should("be.visible");
    cy.get("@fourth-category")
      .find("img")
      .should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      });
    cy.wait(1000);
    cy.get("@fourth-category").click();
    cy.url().should("include", "/category-data?category=tools-and-softwares");
    cy.wait(100);
  });
});

// /category-data?category=design-template
