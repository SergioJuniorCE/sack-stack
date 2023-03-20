import { prisma } from './../prisma';
import express from 'express';
import { Product } from '@prisma/client';

const router = express.Router();

/**
 * Gets all products
 * @returns Product[]
 */
router.get('/', async (req, res) => {
  const products: Product[] = await prisma.product.findMany();
  res.status(200).send(products);
});

/**
 * Gets a product by id
 * @param id
 * @returns Product
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product: Product | null = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!product) {
    res.status(404).send('Product not found');
  }
  res.status(200).send(product);
});

/**
 * Creates a a product
 * @param name
 * @param description
 * @param price
 * @param categoryId
 * @returns Product
 */
router.post('/create-product', async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
    },
  });
  res.status(200).send(product);
});

/**
 * Updates a product
 * @param id
 * @param name
 * @param description
 * @param price
 * @param categoryId
 * @returns Product
 * @example http://localhost:8000/products/1
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;
  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      description,
      price,
      categoryId,
    },
  });
  res.status(200).send(product);
});

/**
 * Deletes a product
 * @param id
 * @param name
 * @param description
 * @param price
 * @param categoryId
 * @return Product
 * @example http://localhost:8000/products/1
 * @example {
 * "name": "Product 1",
 * "description": "Product 1 description",
 * "price": 100,
 * "categoryId": 1
 * }
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).send(product);
});

module.exports = router;