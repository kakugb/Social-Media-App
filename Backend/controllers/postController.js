const Post = require("../models/post");
const User = require("../models/User");

// Create a Post
const createPost = async (req, res) => {
  const { content, image } = req.body;
  const post = new Post({ user: req.user.id, content, image });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};




// Like a Post
const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();
      res.status(200).json({ message: "Post liked", post });
    } else {
      res.status(400).json({ message: "Post already liked" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error liking post" });
  }
};

// Comment on a Post
const commentOnPost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(postId);
    post.comments.push({ user: req.user.id, content });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error commenting on post" });
  }
};

// Fetch All Posts
const getPosts = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("user", "name") // Populate user details
        .populate("comments.user", "name") // Populate commenter details
        .sort({ createdAt: -1 }); // Sort by newest posts
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  };
  
  // Fetch a Single Post by ID
  const getPostById = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId)
        .populate("user", "name") // Populate user details
        .populate("comments.user", "name"); // Populate commenter details
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
  };
  
  const getPostsByUserId = async (req, res) => {
    try {
      const userId = req.params.userId; // Get userId from route parameter
      const posts = await Post.find({ user: userId }) // Find posts by userId
        .populate("user", "name") // Populate the post owner's name
        .populate("likes", "name") // Populate users who liked the post
        .populate("comments.user", "name") // Populate users who commented
        .sort({ createdAt: -1 }); // Sort by most recent posts first
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  };
  

  module.exports = { getPostsByUserId, getPosts, getPostById, createPost, likePost, commentOnPost };
