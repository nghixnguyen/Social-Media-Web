/*test("test users", () => {
    expect(1).toBe(1);
})*/

const usersController = require('../middlewares/users');
const db = require('../config/db');

describe('searchForUserByName function', () => {

    test('should find a user by name', async () => {
        const req = {
            query: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };

        const res = {
            locals: {},
            json: jest.fn(),
            status: jest.fn(),
        };

        const next = jest.fn();

        // Mocking the successful query result
        const expectedUser = { id: 1, firstName: 'John', lastName: 'Doe' };
        db.query.mockResolvedValueOnce([expectedUser]);

        await usersController.searchForUserByName(req, res, next);

        expect(res.locals.searchedUser).toEqual(expectedUser);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    test('should handle no user found', async () => {
        const req = {
            query: {
                firstName: 'Nonexistent',
                lastName: 'User',
            },
        };

        const res = {
            locals: {},
            json: jest.fn(),
            status: jest.fn(),
        };

        const next = jest.fn();

        // Mocking the query result for no user found
        db.query.mockResolvedValueOnce([]);

        await usersController.searchForUserByName(req, res, next);

        expect(res.json).toHaveBeenCalledWith({ searchedUserFound: false });
        expect(next).not.toHaveBeenCalled();
    });

});