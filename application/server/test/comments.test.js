/*test("test comments", () => {
    expect(1).toBe(1);
})
*/

const commentsController = require('../middlewares/comments');

// Mocking the necessary modules
jest.mock('../config/db', () => ({
    query: jest.fn(),
}));

const db = require('../config/db');

describe('fetchCommentsByPostId function', () => {

    test('should handle missing postId', async () => {
        const req = {
            query: {},
        };

        const res = {
            locals: {},
            json: jest.fn(),
        };

        const next = jest.fn();

        await commentsController.fetchCommentsByPostId(req, res, next);

        expect(res.locals.commentFound).toBe(false);
        expect(res.locals.message).toBe('Error Post ID not provided.');
        expect(res.json).toHaveBeenCalledWith(res.locals);
        expect(next).not.toHaveBeenCalled();
    });

    test('should fetch comments for a specific post successfully', async () => {
        const req = {
            query: {
                postId: 1,
            },
        };

        const res = {
            locals: {},
            json: jest.fn(),
        };

        const next = jest.fn();
        const expectedComments = [{ id: 1, text: 'Test comment' }];
        db.query.mockResolvedValueOnce([expectedComments]);

        await commentsController.fetchCommentsByPostId(req, res, next);

        expect(res.locals.commentFound).toBe(true);
        expect(res.locals.comments).toEqual(expectedComments);
        expect(next).toHaveBeenCalled();
    });
});