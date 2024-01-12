import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUserCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const isPasswordCorretlyHashed = await compare(
      '12345678',
      user.password_hash,
    )

    expect(isPasswordCorretlyHashed).toBe(true)
  })
})
