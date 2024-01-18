import { Entity, IEntityProps } from "./Entity";
import { Name } from "@/shared/values-objects/Name";
import { Email } from "@/shared/values-objects/Email";
import { HashPassword } from "@/shared/values-objects/HashPassword";

export interface IUserProps extends IEntityProps {
    name?: string
    email?: string
    password?: string
}

export class User extends Entity<IUserProps, User> {
    readonly name: Name
    readonly email: Email
    readonly password?: HashPassword

    constructor(props: IUserProps) {
        super(props)
        this.name = new Name(props.name ?? '')
        this.email = new Email(props.email)
        if (props.password) this.password = new HashPassword(props.password)
    }
}