describe('Voice Test Flow', () => {
  beforeEach(() => {
    // Login first
    cy.visit('/auth/login')
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Giriş Yap').click()
    cy.url().should('include', '/dashboard')
  })

  it('should complete full test flow', () => {
    // Start new test
    cy.contains('Yeni Test').click()
    cy.url().should('include', '/test/new')

    // Select test level
    cy.contains('Hızlı Test').click()

    // Recording screen
    cy.url().should('include', '/test/recording')
    cy.contains('Kayda Başla').should('be.visible')

    // Mock recording (in real test, would interact with MediaRecorder)
    cy.wait(2000)

    // Processing screen
    cy.url().should('include', '/test/processing')
    cy.contains('Analiz Ediliyor').should('be.visible')

    // Results screen
    cy.url().should('include', '/test/results', { timeout: 10000 })
    cy.contains('Risk Skoru').should('be.visible')
  })

  it('should view test history', () => {
    cy.contains('Geçmiş').click()
    cy.url().should('include', '/history')
    cy.contains('Test Geçmişi').should('be.visible')
  })

  it('should view test details', () => {
    cy.visit('/history')
    cy.get('[data-testid="test-item"]').first().click()
    cy.url().should('match', /\/results\/\d+/)
    cy.contains('Test Detayları').should('be.visible')
  })
})
