const express = require("express");
const {
  createPost,
  likePost,
  commentOnPost,
  getPosts,
  getPostById,
  getPostsByUserId, // Import the function here
} = require("../controllers/postController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// // Fetch all posts by the logged-in user
// router.get("/user", verifyToken, getPostsByUser);

// Fetch all posts
router.get("/", verifyToken, getPosts);

// Fetch a specific post by ID
router.get("/:postId", verifyToken, getPostById);

// Create a Post
router.post("/", verifyToken, createPost);

// Like a Post
router.post("/:postId/like", verifyToken, likePost);

// Comment on a Post
router.post("/:postId/comment", verifyToken, commentOnPost);

//all post of user
// Fetch all posts by userId
router.get("/user/:userId", verifyToken, getPostsByUserId);

module.exports = router;
