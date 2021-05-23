import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/AuthUser";
import checkPassword from "../middlewares/CheckPassword";

const usersRoutes = Router();

usersRoutes.post("/", checkPassword, UserController.create);
usersRoutes.put("/", checkPassword, authMiddleware, UserController.update);
usersRoutes.post("/login", UserController.login);
usersRoutes.get("/:id", authMiddleware, UserController.get);
usersRoutes.delete("/:id", authMiddleware, UserController.delete);

export default usersRoutes;
