describe('url-shortener', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'getSample.json'})
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {fixture: 'postSample'})
    cy.visit('http://localhost:3000')
  })

  it('should have a title', () => {
    cy.get('h1').contains('URL Shortener')
  })

  it('should have existing shortened urls', () => {
    cy.get('section').should('exist')
    cy.get('section').children().should('have.length', 2)

    cy.get(':nth-child(1) > h3').contains('wood')
    cy.get(':nth-child(1) > a').contains('http://localhost:3001/useshorturl/1')
    cy.get(':nth-child(1) > p').contains('https://www.pexels.com/photo/brown-and-black-wood-logs-14010118/')


    cy.get(':nth-child(2) > h3').contains('road')
    cy.get(':nth-child(2) > a').contains('http://localhost:3001/useshorturl/2')
    cy.get(':nth-child(2) > p').contains('https://www.pexels.com/photo/cloud-over-ground-road-on-grassland-10413404/')
  })

  it('should have a form with input fields for title and urlToShorten', () => {
    cy.get('form').should('exist')
    cy.get('[placeholder="Title..."]').should('exist')
    cy.get('[placeholder="URL to Shorten..."]').should('exist')
  })

  it('should reflect user information as the form is filled', () => {
    cy.get('[placeholder="Title..."]').type('cypress test').should('have.value', 'cypress test')
    cy.get('[placeholder="URL to Shorten..."]').type('https://www.pexels.com/photo').should('have.value', 'https://www.pexels.com/photo')
  })

  it('should render a new url when submitted', () => {
    cy.get('[placeholder="Title..."]').type('My repo')
    cy.get('[placeholder="URL to Shorten..."]').type('https://github.com/willhobson85/url-shortener-ui')
    cy.get('button').click()
    cy.get(':nth-child(3) > h3').contains('water')
    cy.get(':nth-child(3) > a').contains('http://localhost:3001/useshorturl/3')
    cy.get(':nth-child(3) > p').contains('https://www.pexels.com/photo/brown-dried-leaves-on-body-of-water-14214462/')
  })
})