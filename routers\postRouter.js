const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author');
  res.json(post);
});

router.put('/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

router.delete('/:id', async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;