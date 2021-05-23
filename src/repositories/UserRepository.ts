import { EntityRepository, getRepository, Repository } from "typeorm";
import { IUser } from "../interfaces/IUser";
import User from "../models/User";
import IUserRepository from "./IUserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    delete user.password;
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    // if (user) {
    //   delete user.password;
    // }
    return user;
  }

  public async createUser(name: string, email: string, password: string): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    delete user.password;
    return user;
  }

  public async deleteUserById(id: string): Promise<User | true> {
    const user = await this.ormRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    await this.ormRepository.delete({ id });
    return true;
  }
  public async updateUser({ name, email, password }: IUser, user: User): Promise<User> {
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await this.ormRepository.save(user);
    delete user.password;
    return user;
  }

  public async checkPassword(password: string, userExists: User): Promise<true | null> {
    const isValidPassword = await bcrypt.compare(String(password), String(userExists.password));
    if (!isValidPassword) {
      return null;
    }
    return true;
  }

  public async login(email: string) {
    const user = await this.ormRepository.findOne({ where: { email } });

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
    delete user.password;
    return {
      user,
      token,
    };
  }
}

export default UserRepository;
