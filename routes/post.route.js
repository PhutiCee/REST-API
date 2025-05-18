const express = require("express");
// const postController = require("../controllers/post.controller");
const { addPost, getPosts, updatePost, deletePost, singlePost } = require("../controllers/post.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/post.middleware");

const router = express.Router();

router.post("/add-post", verifyToken, upload.single("bannerImage"), addPost);
router.get("/get-posts", verifyToken, getPosts);
router.get("/:postId", verifyToken, singlePost);
router.put("/update-post/:postId", verifyToken, upload.single("bannerImage"), updatePost);
router.delete("/delete-post/:postId", verifyToken, deletePost);

module.exports = router;