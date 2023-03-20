import express from "express";
import { prisma } from "../prisma";

const router = express.Router();

/**
 * Gets all orders
 * @returns Order[]
 */
router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany();
  res.status(200).send(orders);
});

/**
 * Gets an order by id
 * @param id
 * @returns Order
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!order) {
    res.status(404).send("Order not found");
  }
  res.status(200).send(order);
});

/**
 * Creates an order
 * @param userId
 * @params products
 */
router.post("/create-order", async (req, res) => {
  const { userId, products } = req.body;
  const order = await prisma.order.create({
    data: {
      userId: Number(userId),
      OrderItem: {
        create: products.map((product: any) => ({
          productId: Number(product.id),
          quantity: Number(product.quantity),
        })),
      },
    },
  });
  res.status(200).send(order);
});
