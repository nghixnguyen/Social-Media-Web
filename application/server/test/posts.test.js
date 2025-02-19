/*test("test posts", () => {
    expect(1).toBe(1);
})*/

const postsController = require('../middlewares/posts');
const db = require('../config/db');

describe('fetchPosts function', () => {

    test('should fetch posts successfully', async () => {
        const req = {};
        const res = {
            locals: {},
            json: jest.fn(),
        };
        const next = jest.fn();

        // Mocking the successful query result
        const expectedPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
        db.query.mockResolvedValueOnce([expectedPosts]);

        await postsController.fetchPosts(req, res, next);

        expect(res.locals.postFound).toBe(true);
        expect(res.locals.posts).toEqual(expectedPosts);
        expect(next).toHaveBeenCalled();
    });

    test('should handle no posts found', async () => {
        const req = {};
        const res = {
            locals: {},
            json: jest.fn(),
        };
        const next = jest.fn();

        // Mocking the query result for no posts found
        db.query.mockResolvedValueOnce([]);

        await postsController.fetchPosts(req, res, next);

        expect(res.locals.postFound).toBe(false);
        expect(res.locals.message).toBe('No post found for this user.');
        expect(res.json).toHaveBeenCalledWith(res.locals);
        expect(next).not.toHaveBeenCalled();
    });

    /*test('should handle database error', async () => {
        const req = {};
        const res = {
            locals: {},
            json: jest.fn(),
        };
        const next = jest.fn();

        // Mocking an error in the query
        db.query.mockRejectedValueOnce(new Error('Database error'));

        await postsController.fetchPosts(req, res, next);

        expect(res.locals.postFound).toBe(false);
        expect(res.locals.message).toBe('An error occurred while fetching all posts from a specific user.');
        expect(res.json).toHaveBeenCalledWith(res.locals);
        expect(next).not.toHaveBeenCalled();
    });*/
});