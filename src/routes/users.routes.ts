import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/AuthUser";

const usersRoutes = Router();

usersRoutes.post("/", UserController.create);
usersRoutes.post("/login", authMiddleware, UserController.login);
usersRoutes.get("/:id", UserController.get);

export default usersRoutes;
