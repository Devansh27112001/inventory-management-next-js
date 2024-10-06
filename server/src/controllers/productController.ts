import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Promise<void>: it returns a Promise that resolves to void, meaning the function does not return any specific value. This type declaration is useful for TypeScript to ensure that the function behaves as expected (resolving to nothing explicitly, just completing the request/response cycle).
export const getProducts = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const search = request.query.search?.toString();
    // If the search is an empty string, the below query will return all the products, otherwise it will return the products which contains the search string.
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    response.status(200).json(products);
  } catch (error) {
    response
      .status(500)
      .json({ status: "failed", message: "Error retrieving products" });
  }
};

export const createProduct = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = request.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });

    response.status(201).json(product);
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: "Error creating the product",
    });
  }
};
