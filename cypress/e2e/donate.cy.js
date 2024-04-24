/* eslint-disable no-undef */
describe("Donate page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("clicking on please donate now takes to donate page", () => {
    cy.get('[data-test="banner-donate"]').as("donate");
    cy.get("@donate").contains(/please donate now/i);
    cy.get("@donate").click();
    cy.location("pathname").should("equal", "/donate");
    cy.title().should("eq", "Donate to YT Shops");
    cy.get("h2").contains(/donate to yt shops/i);
  });
  it("clicking on footer link takes to donate page", () => {
    cy.get('[data-test="footer-donate"]').as("donate");
    cy.get("@donate").contains(/donate/i);
    cy.get("@donate").click({ force: true });
    cy.location("pathname").should("eq", "/donate");
    cy.title().should("eq", "Donate to YT Shops");
    cy.get("h2").contains(/donate to yt shops/i);
  });
  it("on donate page user can select donation amount and clicking donate takes to payment page", () => {
    cy.visit("/donate");
    cy.get('[data-test="donation-field"]').clear().type(100);
    cy.wait(2000);
    cy.get('[data-test="donation-button"]').click();
    cy.location("pathname").should("eq", "/payment");
    cy.wait(200);
  });
  it.only("user will enter invalid input and donate button will not work", () => {
    cy.visit("/donate");
    cy.wait(1000);
    // cy.get('[data-test="donation-field"]').clear().type("1");
    cy.getByData("donation-field").clear().type("1");
    cy.wait(100);
    cy.get('[data-test="donation-button"]').should('be.disabled');
    cy.location("pathname").should("not.eq", "/payment")
  })
});
