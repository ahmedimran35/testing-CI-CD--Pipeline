/* eslint-disable no-undef */
describe("Why choose us", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should have proper heading", () => {
    cy.get("h3").contains(/benefits/i);
    cy.get("h2").contains(/enhance digital journey/i);
  });
  it("first card", () => {
    cy.get('[data-test="card-heading-1"]').contains(/extensive library/i);
    cy.get('[data-test="card-para-1"]').contains(/Explore a vast library of diverse digital assets for all creative needs./i);
  });
  it("second card", () => {
    cy.get('[data-test="card-heading-2"]').contains(/market place/i);
    cy.get('[data-test="card-para-2"]').contains(/YT shops is a multi vendor marketplace. It provide a place for creator and creative people./i);
  });
  it("third card", () => {
    cy.get('[data-test="card-heading-3"]').contains(/powerful tools/i);
    cy.get('[data-test="card-para-3"]').contains(/it has lots of powerful tools for creators in one place. It's your go to place./i)
  });
  it("fourth card", () => {
    cy.get('[data-test="card-heading-4"]').contains(/easy connect/i);
    cy.get('[data-test="card-para-4"').contains(/yt shops makes connection between creators easy. join us now./i)
  })
});
