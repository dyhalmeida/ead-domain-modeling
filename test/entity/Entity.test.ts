import { Entity, IEntityProps } from "@/entity/Entity"
import { Id } from "@/shared/values-objects/Id"

interface IProductProps extends IEntityProps {
    name?: string
    description?: string
}

class Product extends Entity<IProductProps, Product> {
    readonly name: string
    readonly description: string
    constructor(props: IProductProps) {
        super(props)
        this.name = props.name ?? ''
        this.description = props.description ?? ''
    }
}

describe('Entity', () => {

    it('Should compare two entities with different IDs', () => {
        const product1 = new Product({
            name: 'Laptop Dell XPS 13',
            description: 'Powerful laptop with a stunning InfinityEdge display.'
        })
        const product2 = new Product({
            name: 'Smartphone iPhone 13',
            description: 'The latest iPhone with advanced camera features and performance.'
        })

        expect(product1.isEqual(product2)).toBeFalsy()
        expect(product1.isDifferent(product2)).toBeTruthy()
    })

    it('Should compare two entities with the same ID and different attribute values', () => {
        const id = Id.new.value
        const product1 = new Product({
            id,
            name: 'Laptop Dell XPS 13',
            description: 'Powerful laptop with a stunning InfinityEdge display.'
        })
        const product2 = new Product({
            id,
            name: 'Smartphone iPhone 13',
            description: 'The latest iPhone with advanced camera features and performance.'
        })

        expect(product1.isEqual(product2)).toBeTruthy()
        expect(product1.isDifferent(product2)).toBeFalsy()
    })

    it('Should compare an entity with undefined and null', () => {
        const product1 = new Product({
            name: 'Laptop Dell XPS 13',
            description: 'Powerful laptop with a stunning InfinityEdge display.'
        })
        expect(product1.isEqual(undefined as any)).toBeFalsy()
        expect(product1.isEqual(null as any)).toBeFalsy()
        expect(product1.isDifferent(undefined as any)).toBeTruthy()
        expect(product1.isDifferent(null as any)).toBeTruthy()
    })

    it('Should clone the product object with the changed name', () => {
        const product1 = new Product({
            name: 'Laptop Dell XPS 13',
            description: 'Powerful laptop with a stunning InfinityEdge display.'
        })
        const product2 = product1.clone({ name: 'Laptop Dell XPS 15' })

        expect(product2.id.value).toBe(product1.id.value)
        expect(product2.description).toBe(product1.description)
        expect(product2.name).not.toBe(product1.name)
    })

    it('Should clone the product object with a new ID', () => {
        const product1 = new Product({
            name: 'Laptop Dell XPS 13',
            description: 'Powerful laptop with a stunning InfinityEdge display.'
        })
        const product2 = product1.clone({ id: Id.new.value })

        expect(product2.id.value).not.toBe(product1.id.value)
        expect(product2.name).toBe(product1.name)
        expect(product2.description).toBe(product1.description)
    })

})