import express from 'express';
import { prisma } from '../prisma';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).send(user);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });
  res.status(200).send(user);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).send(user);
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  res.status(200).send(user);
});

router.post('/create-user', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.status(200).send(user);
});

module.exports = router;