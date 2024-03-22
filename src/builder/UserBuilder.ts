import { IUserProps, User } from '@/entity/User'
import { faker } from '@faker-js/faker'

export class UserBuilder {

    private constructor(public props: IUserProps) {}

    static create(): UserBuilder {
        return new UserBuilder({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 60,
                pattern: /[A-Za-z0-9\.\/]/,
                prefix: '$2a$12$'
            })
        })
    }

    withId(id: string): UserBuilder {
        this.props.id = id
        return this
    }

    withoutId(): UserBuilder {
        this.props.id = undefined
        return this
    }

    
    withName(name: string): UserBuilder {
        this.props.name = name
        return this
    }

    withoutName(): UserBuilder {
        this.props.name = undefined
        return this
    }

    withEmail(email: string): UserBuilder {
        this.props.email = email
        return this
    }

    withoutEmail(): UserBuilder {
        this.props.email = undefined
        return this
    }

    withPassword(password: string): UserBuilder {
        this.props.password = password
        return this
    }

    withoutPassword(): UserBuilder {
        this.props.password = undefined
        return this
    }

    now(): User {
        return new User(this.props)
    }
}