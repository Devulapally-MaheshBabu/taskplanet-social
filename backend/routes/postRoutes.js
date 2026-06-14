const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});
const upload = multer({ storage: storage });

// Create a post
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { text } = req.body;
    let imagePath = '';

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    if (!text && !imagePath) {
      return res.status(400).json({ message: 'Post must contain text or an image' });
    }

    const newPost = new Post({
      userId: req.user.id,
      username: req.user.username,
      text: text || '',
      image: imagePath
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Newest first
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like/Unlike a post
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if post has already been liked by this user
    const likeIndex = post.likes.findIndex(like => like.userId.toString() === req.user.id);

    if (likeIndex > -1) {
      // User already liked it, so unlike (remove like)
      post.likes.splice(likeIndex, 1);
    } else {
      // User hasn't liked it, add like
      post.likes.push({ userId: req.user.id, username: req.user.username });
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      userId: req.user.id,
      username: req.user.username,
      text
    };

    post.comments.push(newComment);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
