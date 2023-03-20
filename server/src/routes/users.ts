import express from 'express';
import { prisma } from '../prisma';

const router = express.Router();

/**
 * Gets all users
 * @returns User[]
 */
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

/**
 * Gets a user by id
 * @param id
 * @returns User
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!user) {
    res.status(404).send('User not found');
  }
  res.status(200).send(user);
});

/**
 * Creates a user
 * @param name
 * @param email
 * @param password
 * @returns User
 */
router.post('/create-user', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.status(200).send(user);
});

/**
 * Updates a user
 * @param id
 * @returns User
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
      password,
    },
  });
  res.status(200).send(user);
});

/**
 * Deletes a user
 * @param id
 * @returns User
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).send(user);
});

module.exports = router;