const seasonsNormalizer = require("./seasonsNormalizer")
// @ponicode
describe("seasonsNormalizer.default", () => {
    test("0", () => {
        let callFunction = () => {
            seasonsNormalizer.default(["TestUpperCase@Example.com", "TestUpperCase@Example.com", "TestUpperCase@Example.com", "ponicode.com", "something.example.com"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            seasonsNormalizer.default(["email@Google.com", "user@host:300", "TestUpperCase@Example.com", "something.example.com", "user1+user2@mycompany.com"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            seasonsNormalizer.default(["email@Google.com", "something@example.com", "user1+user2@mycompany.com", "user1+user2@mycompany.com", "email@Google.com"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            seasonsNormalizer.default(["user1+user2@mycompany.com", "something@example.com", "TestUpperCase@Example.com", "user1+user2@mycompany.com", "user@host:300"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            seasonsNormalizer.default(["user@host:300", "ponicode.com", "user@host:300", "something@example.com", "ponicode.com"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            seasonsNormalizer.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
