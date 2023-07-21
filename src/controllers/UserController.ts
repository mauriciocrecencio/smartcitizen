import { Request, Response } from "express";
import {UserRepository} from "../repositories/UserRepository";
class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userRepository = new UserRepository();
    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      return res.status(409).json({ message: "This email has already been registered" });
    }

    const user = await userRepository.createUser(name, email, String(password));
    res.statusMessage = "OK"
    return res.status(200).json({ user });
  }

  async update(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const { id } = req;
    const userExists = await userRepository.findById(id);
    if (!userExists) {
      return res.status(409).json({ message: "No user found" });
    }
    const { email, password, name } = req.body;
    const updatedUser = await userRepository.updateUser({ email, password, name }, userExists);

    return res.json(updatedUser);
  }

  async get(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    return res.status(200).json({ user });
  }

  async delete(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const idOfUserRequest = req.id;
    const userIdToBeDeleted = req.params.id;
    if (idOfUserRequest !== userIdToBeDeleted) {
      return res.status(400).json({ message: "You cannot delete others users!" });
    }
    const user = await userRepository.deleteUserById(userIdToBeDeleted);
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    return res.status(200).json({ message: "User successfully deleted" });
  }

  async login(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const { email, password } = req.body;

    const userExists = await userRepository.findByEmail(email);

    if (!userExists) {
      return res.status(400).json({ message: "No user found" });
    }
    const isValidPassword = await userRepository.checkPassword(password, userExists);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const userLogged = await userRepository.login(email);

    res.statusMessage = "Created"
    return res.status(201).json(userLogged);
  }
}

export default new UserController();
