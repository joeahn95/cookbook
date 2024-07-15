import { RecipeBody } from "../../types";
import prisma from "../prisma/prismaModel";
import { Router, Request, Response, NextFunction } from "express";
const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, description }: RecipeBody = req.body;

  if (typeof name !== "string" || typeof description !== "string") {
    return next({
      log: "invalid request body types",
      message: { err: "request body types are invalid" },
    });
  }

  // Create a new recipe
  const recipe = await prisma.recipes.create({
    data: {
      name,
      description,
    },
  });
  return res.status(200).json(recipe);
});

router.post(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id);
    const { name, description }: RecipeBody = req.body;

    if (
      Number.isNaN(id) ||
      typeof name !== "string" ||
      typeof description !== "string"
    ) {
      return next({
        log: "invalid request body types",
        message: { err: "request body types are invalid" },
      });
    }

    // Update Recipe
    const updateRecipe = await prisma.recipes.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    return res.status(200).json(updateRecipe);
  }
);

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  const { id, name }: RecipeBody = req.body;

  if (typeof name !== "string" || typeof id !== "number") {
    return next({
      log: "invalid request body types",
      message: { err: "request body types are invalid" },
    });
  }

  // Delete Recipe
  const deleteRecipe = await prisma.recipes.delete({
    where: {
      id,
    },
  });

  return res.status(200).json(deleteRecipe);
});

export default router;
