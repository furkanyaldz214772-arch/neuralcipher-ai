import { api } from '../api'

describe('API Client', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Authentication', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        access_token: 'test-token',
        token_type: 'bearer',
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await api.auth.login('test@example.com', 'password123')

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        })
      )
    })

    it('should handle login error', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ detail: 'Invalid credentials' }),
      })

      await expect(
        api.auth.login('test@example.com', 'wrong-password')
      ).rejects.toThrow()
    })
  })

  describe('Tests', () => {
    it('should create test', async () => {
      const mockResponse = {
        test_id: 1,
        upload_url: 'https://example.com/upload',
        status: 'pending',
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await api.tests.create('quick')

      expect(result).toEqual(mockResponse)
    })

    it('should list tests', async () => {
      const mockResponse = {
        tests: [],
        total: 0,
        page: 1,
        page_size: 20,
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await api.tests.list()

      expect(result).toEqual(mockResponse)
    })
  })
})
