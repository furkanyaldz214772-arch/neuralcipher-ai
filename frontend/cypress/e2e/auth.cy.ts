describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/auth/login')
  })

  it('should display login form', () => {
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', 'Giriş Yap').should('be.visible')
  })

  it('should login successfully', () => {
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Giriş Yap').click()

    cy.url().should('include', '/dashboard')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.contains('button', 'Giriş Yap').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('should navigate to register page', () => {
    cy.contains('Kayıt Ol').click()
    cy.url().should('include', '/auth/register')
  })
})

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/auth/register')
  })

  it('should display registration form', () => {
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('have.length', 2)
    cy.contains('button', 'Kayıt Ol').should('be.visible')
  })

  it('should register successfully', () => {
    const email = `test${Date.now()}@example.com`
    
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').first().type('password123')
    cy.get('input[type="password"]').last().type('password123')
    cy.contains('button', 'Kayıt Ol').click()

    cy.url().should('include', '/dashboard')
  })

  it('should show error for password mismatch', () => {
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').first().type('password123')
    cy.get('input[type="password"]').last().type('different123')
    cy.contains('button', 'Kayıt Ol').click()

    cy.contains('Passwords do not match').should('be.visible')
  })
})
