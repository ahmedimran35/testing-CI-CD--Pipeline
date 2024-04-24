/* eslint-disable no-undef */
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit("/");
  })
  it('title', () => {
    cy.title().should('eq', 'YT SHOPS | For Creators, By Creators');
  })
  it('banner section text', () => {
    cy.getByData("main-title").contains(/free & unlimited resources for content creators/i);
  })
  it('buttons on homepage', () => {
    cy.get('button').contains(/create account/i); 
    cy.get('button').contains(/sign in/i); 
    cy.get('button').contains(/browse all category/i); 
  })
  it.only('user can search with search bar', () => {
    cy.getByData("search").find('input').as("search-bar");
    cy.get('@search-bar').type("mango{enter}");
    cy.wait(2000);
    cy.url().should('include', '/category-data');
    cy.contains(/to use free forever/i).should('not.exist');
  })
  it('user can not search with html tag', () => {
    cy.get('[data-test="search"]').find('input').as("search-bar");
    cy.get('@search-bar').type("<script></script>");
    cy.wait(2000);
    cy.get('[data-test="enter"]').click({ force: true });  
    cy.url().should('not.include', '/category-data');
    cy.contains(/to use free forever/i).should('exist');
  })
  it('user can not search with number', () => {
    cy.get('[data-test="search"]').find('input').as("search-bar");
    cy.get('@search-bar').type("124556");
    cy.wait(2000);
    cy.get('[data-test="enter"]').click({ force: true });    
    cy.url().should('not.include', '/category-data');
    cy.contains(/to use free forever/i).should('exist');
  })
})
