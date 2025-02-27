import express from "express";
import { getUsers } from "../controllers/usercontroller";

const router = express.Router();

router.get("/", getUsers);

export default router;
