import { Errors } from "@/constants/errors.constants"
import { Url } from "@/shared/values-objects/Url"

describe('URL', () => {

    it('Should create a valid instance of URL', () => {
        const url = new Url('https://www.github.com')
        expect(url).toBeDefined()
    })

    it('Should throw an error when creating an invalid URL instance', () => {
        try {
            new Url()    
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_URL)
        }

        try {
            new Url('')    
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_URL)
        }

        try {
            new Url('github.com')    
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_URL)
        }

        try {
            new Url('www.github.com')    
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_URL)
        }

        try {
            new Url('https//github.com')    
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_URL)
        }
    })

    it('Should get the protocol of an URL instance', () => {
        const url = new Url('https://github.com')
        expect(url.protocol).toBe('https:')
    })

    it('Should get the path of the instance of a URL', () => {
        const url = new Url('https://github.com/dyhalmeida?tab=repositories&q=example')
        expect(url.path).toBe('/dyhalmeida')
    })

    it('Should get the domain of the instance of a URL', () => {
        const url = new Url('https://github.com/dyhalmeida')
        expect(url.domain).toBe('github.com')
    })

    it('Should get the URL instance parameters', () => {
        const url = new Url('https://github.com/dyhalmeida?tab=repositories&q=example')
        expect(url.params).toEqual({
            tab: 'repositories',
            q: 'example'
        })
    })

})