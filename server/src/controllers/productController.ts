import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Promise<void>: it returns a Promise that resolves to void, meaning the function does not return any specific value. This type declaration is useful for TypeScript to ensure that the function behaves as expected (resolving to nothing explicitly, just completing the request/response cycle).
export const getProducts = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
  } catch (error) {}
};
