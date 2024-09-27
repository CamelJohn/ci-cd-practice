import app from "../../src/app";

describe("Express app should satisfy following:", () => {
    it('is defined', () => expect(app).toBeDefined());

    it('is an instance of express app', () => {
        expect(app).toBeInstanceOf(Object);
        expect(app).toBeInstanceOf(Function);
    });
});