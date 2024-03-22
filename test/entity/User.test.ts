import { Errors } from '@/constants/errors.constants'
import { UserBuilder } from '../../src/builder/UserBuilder'
import { ErrorValidation } from '@/error/ErrorValidation'
import { Id } from '@/shared/values-objects/Id'

describe('User', () => {

  it('Should create a valid user instance', () => {
    const fullname = 'John Doe'
    const email = 'john.doe@mail.com'
    const user = UserBuilder.create().withName(fullname).withEmail(email).now()
    expect(user.name.fullname).toBe(fullname)
    expect(user.email.value).toBe(email)
    expect(user.password).toBeDefined()
  })

  it('Should create an instance of User without password', () => {
    const user = UserBuilder.create().withoutPassword().now()
    expect(user.password?.value).toBeUndefined()
  })

  it('Should throw an error when creating an unnamed User instance', () => {
    try {
      const user = UserBuilder.create().withoutName().now()
    } catch (error: any) {
      expect(error[0]?.code).toBe(Errors.EMPTY_NAME)
    }
  })

  it('Should throw an error when creating an instance of User without the full name', () => {
    try {
      UserBuilder.create().withName('John').now()
    } catch (errors: any) {
      const localErrors = <ErrorValidation[]>errors
      expect(localErrors.some((error) => error.code === Errors.NAME_WITHOUT_LAST_NAME)).toBeTruthy()
    }
  })

  it('Should throw an error when creating an instance of User without the email', () => {
    try {
      UserBuilder.create().withoutEmail().now()
    } catch (errors: any) {
      const localError = <ErrorValidation>errors
      expect(localError.code).toBe(Errors.INVALID_EMAIL)
    }
  })

  it('Should create an instance of a User with the ID provided', () => {
    const user = UserBuilder.create().withId(Id.new.value).now()
    expect(user.id.value).toBeDefined()
    expect(user.id.isNew).toBeFalsy()
  })

  it('Sould create an instance of a User without the ID provided', () => {
    const user = UserBuilder.create().withoutId().now()
    expect(user.id.value).toBeDefined()
    expect(user.id.isNew).toBeTruthy()
  })

  it('Should create an instance of a User with the password provided', () => {
    const user = UserBuilder.create().withPassword('$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6').now()
    expect(user.password?.value).toBeDefined()
  })
  
})
