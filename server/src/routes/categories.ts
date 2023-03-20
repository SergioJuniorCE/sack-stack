import { prisma } from './../prisma';
import express from 'express';
import { Category } from '@prisma/client';

const router = express.Router();

/**
 * Gets all categories
 */
router.get('/', async (req, res) => {
  const categories: Category[] = await prisma.category.findMany();
  res.status(200).send(categories);
});

/**
 * Gets a category by id
 * @param id
 * @returns Category
 * @example http://localhost:8000/categories/1
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category: Category | null = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!category) {
    res.status(404).send('Category not found');
  }
  res.status(200).send(category);
});

/**
 * Creates a category
 * @param name
 * @returns Category
 * @example http://localhost:8000/categories/create-category
 * @example {
 * "name": "Category 1"
 * }
 */
router.post('/create-category', async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({
    data: {
      name,
    },
  });
  res.status(200).send(category);
});

/**
 * Updates a category
 * @param id
 * @param name
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
    },
  });
  res.status(200).send(category);
});

/**
 * Deletes a category
 * @param id
 * @returns Category
 * @example http://localhost:8000/categories/1
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).send(category);
});

module.exports = router;