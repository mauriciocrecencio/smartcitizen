import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class UserController {
  async create(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ email, password });
    await repository.save(user);
    return res.json(user);
  }

  async get(req: Request, res: Response) {
    const repository = getRepository(User);
    const { id } = req.params;

    const userExists = await repository.findOne({ where: { id } });
    if (!userExists) {
      return res.sendStatus(400);
    }
    return res.json(userExists);
  }

  async login(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(String(password), String(user.password));
    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    // Tem que colocar no .env
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
    delete user.password;
    return res.json({
      user,
      token,
    });
  }
}

export default new UserController();
