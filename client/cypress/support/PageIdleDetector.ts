export class PageIdleDetector {
  defaultOptions = { timeout: 60000 }

  WaitForPageToBeIdle() {
    this.WaitForPageToLoad()
    this.WaitForRequestsToComplete()
    this.WaitForAnimationsToStop()
  }

  WaitForPageToLoad(options = this.defaultOptions) {
    cy.document(options).should(myDocument => {
      expect(myDocument.readyState, "WaitForPageToLoad").to.be.oneOf([
        "interactive",
        "complete"
      ])
    })
  }

  WaitForRequestsToComplete(options = this.defaultOptions) {
    cy.wait(0); // Ensure any previous Cypress commands have finished
    cy.intercept('**').as('allRequests');
    cy.wait("@allRequests", { timeout: options.timeout }).then(() => {
      cy.get("@allRequests").should("have.length", 0);
    });
  }

  WaitForAnimationsToStop(options = this.defaultOptions) {
    cy.get(":animated", options).should("not.exist")
  }
}
