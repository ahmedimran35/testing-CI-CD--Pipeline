
/* eslint-disable no-undef */
describe("Category Landing Page", () => {
  beforeEach(() => {
    cy.visit("/category-data");
  });
  context("Clicking on main categories", () => {
    it("clicking on all should show all datas", () => {
      cy.getByData("all-category").click();
      cy.wait(1000);
      cy.url().should("include", "category=All");
    });
    it("clicking on design template show all design template", () => {
      cy.getByData("category-0").click();
      cy.wait(1000);
      cy.url().should("include", "category=design-template");
    });
    it("clicking on icon show all icons", () => {
      cy.getByData("category-1").click();
      cy.wait(1000);
      cy.url().should("include", "category=icon");
    });
    it("clicking on stock photos show all stock photos", () => {
      cy.getByData("category-2").click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
    });
    it("clickig on courses and learning will show the data fron that category", () => {
      cy.getByData("category-3").click();
      cy.wait(1000);
      cy.url().should("include", "category=courses-and-learning");
    });
  });

  context("Clicking on sub categories of design templates", () => {
    beforeEach(() => {
      cy.getByData("category-0").click();
    });
    it("clicking on psd will show all psd data", () => {
      cy.getByData("PSD").click();
      cy.wait(1000);
      cy.url().should("include", "subCategory=psd");
    });
    it("clicking on template will show all template subcategory data", () => {
      cy.getByData("Template").click();
      cy.wait(1000);
      cy.url().should("include", "subCategory=template");
    })
  });

  context("Clicking on sub categories of icon", () => {
    beforeEach(() => {
      cy.getByData("category-1").click();
    });
    it("clicking on ai generated will show the ai generated icons", () => {
      cy.get('[data-test="AI generated"]').click();
      cy.wait(1000);
      cy.url().should("include", "subCategory=ai-generated");
    })
  });

  context("clicking on sub categories of stock photos", () => {
    beforeEach(() => {
      cy.getByData("category-2").click();
    });
    it("clicking on ai generated will show the ai generated stock photos", () => {
      cy.get('[data-test="AI Generated"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=ai-generated");
    });
    it("clicking on technology will show technology related photos", () => {
      cy.get('[data-test="Technology"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=technology");
    });
    it("clicking on nature will show nature related photos", () => {
      cy.get('[data-test="Nature"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=nature");
    });
    it("clicking on education and learning will show the necessary stock photos", () => {
      cy.get('[data-test="Education and Learning"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=education-and-learning");
    });
    it("clicking on marketing will show marketing related photos", () => {
      cy.get('[data-test="Marketing"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=marketing");
    });
    it("clicking on food will show food related photos", () => {
      cy.get('[data-test="Food"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=food");
    });
    it("clicking on sports will show sports related photos", () => {
      cy.get('[data-test="Sports"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=sports");
    });
    it("clicking on people will show people related photos", () => {
      cy.get('[data-test="People"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=people");
    });
    it("clicking on health will show health related photos", () => {
      cy.get('[data-test="Health"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=health");
    });
    it("clicking on lifestyle will show lifestyle related photos", () => {
      cy.get('[data-test="Lifestyle"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=stock-photos");
      cy.url().should("include", "subCategory=lifestyle");
    });
  });

  context("clicking on sub categories of courses and learning", () => {
    beforeEach(() => {
      cy.getByData("category-3").click();
    });
    it("clicking on pdf will show pdf related photos", () => {
      cy.get('[data-test="PDF"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=courses-and-learning");
      cy.url().should("include", "subCategory=pdf");
    });
    it("clicking on custom gpts will show custom gpts related photos", () => {
      cy.get('[data-test="Custom GPT\'s"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=courses-and-learning");
      cy.url().should("include", "subCategory=custom-gpts");
    });
    it("clicking on custom gpts will show custom gpts related photos", () => {
      cy.get('[data-test="Custom GPT\'s"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=courses-and-learning");
      cy.url().should("include", "subCategory=custom-gpts");
    });
    it("clicking on ai generated will show the ai generated courses and learning", () => {
      cy.get('[data-test="AI generated"]').click();
      cy.wait(1000);
      cy.url().should("include", "category=courses-and-learning");
      cy.url().should("include", "subCategory=ai-generated");
    });
  })
});
