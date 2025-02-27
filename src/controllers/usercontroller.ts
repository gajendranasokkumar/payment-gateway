import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json({ message: "List of users" });
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Fetching user with ID: ${id}` });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.json({ message: "User created", data: { name, email } });
};
