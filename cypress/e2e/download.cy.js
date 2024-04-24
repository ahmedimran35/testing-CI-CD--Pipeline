/* eslint-disable no-undef */
describe('download functionality', () => {
    beforeEach(() => {
        cy.visit("/");
    })
    it('go to single asset page to download', () => {
        cy.getByData("search").type("r");
        cy.wait(1000);
        cy.getByData("enter").click({ force: true});
        cy.getByData("asset-0").click();
    })

})