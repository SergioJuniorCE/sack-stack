import express from 'express';
import { prisma } from '../prisma';

const router = express.Router();

router.get('/get-all-posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.status(200).send(posts);
});

// router.post('/create-post', async (req, res) => {
//   const { title, content } = req.body;
//   const post = await prisma.post.create({
//     data: {
//       title,
//       content,
//     },
//   });
//   res.status(200).send(post);
// });

module.exports = router;