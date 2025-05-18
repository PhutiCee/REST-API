const express = require("express");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const { sessionCheckAuth } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @openapi
 * /api/v1/user-posts:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get posts for each user
 *     description: This endpoint fetches all posts of each user.
 *     responses:
 *       200:
 *         description: List of users with posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       postData:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             title:
 *                               type: string
 *                             content:
 *                               type: string
 *                             status:
 *                               type: string
 *       500:
 *         description: Internal server error
 */
// User wise posts
router.get("/user-posts", sessionCheckAuth, async (req, res) => {

    try {

        const postsData = await User.aggregate([
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "postData"
                }
            }
        ]);

        return res.json({
            status: true,
            posts: postsData
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error
        });
    }
});

/**
 * @openapi
 * /api/v1/male-users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all male users
 *     description: This endpoint retrieves all male users.
 *     responses:
 *       200:
 *         description: List of male users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Male Users"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       gender:
 *                         type: string
 *       404:
 *         description: No male users found
 *       500:
 *         description: Internal server error
 */
// Get Male Users
router.get("/male-users", sessionCheckAuth, async (req, res) => {

    const users = await User.find({
        gender: "male"
    });

    if (users.length > 0) {

        return res.json({
            status: true,
            message: "Male Users",
            users
        });
    } else {
        return res.json({
            status: false,
            message: "No male users found"
        });
    }
});

/**
 * @openapi
 * /api/v1/female-users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all female users
 *     description: This endpoint retrieves all female users.
 *     responses:
 *       200:
 *         description: List of female users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Female Users"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       gender:
 *                         type: string
 *       404:
 *         description: No female users found
 *       500:
 *         description: Internal server error
 */
// Get Female Users
router.get("/female-users", sessionCheckAuth, async (req, res) => {

    const users = await User.find({
        gender: "female"
    });

    if (users.length > 0) {

        return res.json({
            status: true,
            message: "Female Users",
            users
        });
    } else {
        return res.json({
            status: false,
            message: "No female users found"
        });
    }
});

/**
 * @openapi
 * /api/v1/all-posts-with-user:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts with user information
 *     description: This endpoint retrieves all posts and includes user information for each post.
 *     responses:
 *       200:
 *         description: List of posts with user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Posts found"
 *                 posts:
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
 *                       userId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *       500:
 *         description: Internal server error
 */
// Get Post with User Information
router.get("/all-posts-with-user", sessionCheckAuth, async (req, res) => {

    const posts = await Post.find({}).populate("userId");

    return res.json({
        status: true,
        message: "Posts found",
        posts
    });
});

module.exports = router;