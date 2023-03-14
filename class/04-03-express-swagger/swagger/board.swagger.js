/**
 * @swagger
 * /boards:
 *   get:
 *     description: 모든 게시글 가져오기
 *     parameters:
 *         - in: query
 *           name: number
 *           type: int
 *     responses:
 *       200:
 *         description: (성공)Returns a objects of boards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   number:
 *                     type: int
 *                     example: 1
 *                   writer:
 *                     type: string
 *                     example: 'user_1'
 *                   title:
 *                     type: string
 *                     example: 'board_1'
 */