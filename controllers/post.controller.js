const { StatusCodes } = require("http-status-codes");
const { PostSchemaValidation } = require("../validation/post.validation");
const postModel = require("../models/post.model");

/**
 * @openapi
 * /api/v1/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     description: This endpoint allows users to create a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               content:
 *                 type: string
 *                 description: Content of the post
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 description: The status of the post
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Post created"
 *       500:
 *         description: Internal server error
 */
const addPost = async (req, res) => {

    const requestBody = req.body;
    const { error } = PostSchemaValidation.validate(req.body);

    if (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.details[0]?.message
        })
    }

    const bannerImage = req.file ? req.file.filename : null;

    const postObject = new postModel({ ...requestBody, userId: req.session.user.id, bannerImage });
    await postObject.save();
    return res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: "Post created"
    })
}

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts of a user
 *     description: This endpoint retrieves all posts created by the authenticated user.
 *     responses:
 *       200:
 *         description: List of posts available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Posts Available"
 *                 userPosts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       status:
 *                         type: string
 *       404:
 *         description: No posts found
 *       500:
 *         description: Internal server error
 */
const getPosts = async (req, res) => {
    const requestBody = req.body;

    try {
        const userPosts = await postModel.find({
            userId: req.user.id
        })

        if (userPosts.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                message: "Posts Available",
                userPosts
            })
        }

        return res.status(StatusCodes.NOT_FOUND).json({
            status: StatusCodes.NOT_FOUND,
            message: "Posts Not Found"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

/**
 * @openapi
 * /api/v1/posts/{postId}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Update an existing post
 *     description: This endpoint allows users to update an existing post.
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
const updatePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await postModel.findOne({ _id: postId, user: req.user.id });

        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: "Post not found"
            });
        }

        const { title, content, status } = req.body;

        if (title) post.title = title;
        if (content) post.content = content;
        if (status) post.status = status;

        if (req.file) {
            post.bannerImage = req.file.filename;
        }

        await post.save();

        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

/**
 * @openapi
 * /api/v1/posts/{postId}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post
 *     description: This endpoint allows users to delete a specific post.
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
const deletePost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await postModel.findOneAndDelete({ _id: postId, user: req.user.id });

        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: "Post not found"
            });
        }

        await post.save();

        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Post deleted successfully",
            post
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
}

/**
 * @openapi
 * /api/v1/posts/{postId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get a single post by ID
 *     description: This endpoint retrieves a specific post based on the post ID.
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Post retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     status:
 *                       type: string
 *       404:
 *         description: Post not found or user is unauthorized to view it
 *       500:
 *         description: Internal server error
 */
const singlePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await postModel.findOne({ _id: postId, user: req.user.id });

        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: "Post not found or you are not authorized to view it"
            });
        }

        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Post retrieved successfully",
            data: post
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "An error occurred while retrieving the post",
            error: error.message
        });
    }
};

module.exports = {
    addPost, getPosts, updatePost, deletePost, singlePost
}