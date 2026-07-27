const { greet } = require('./greet');

describe('greet', () => {
    it('should return a greeting message with the provided name', () => {
        const name = 'Alice';
        const expectedGreeting = 'Hello, Alice!';
        const actualGreeting = greet(name);
        expect(actualGreeting).toBe(expectedGreeting);
    });

    it('should throw an error if no name is provided', () => {
        expect(() => greet()).toThrow('Name is required');
    });
});