import { IUser } from "../interfaces/IUser";
import User from "../models/User";

export default interface IUserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  createUser(name: string, email: string, password: string): Promise<User>;
  updateUser({ name, email, password }: IUser, user: User): Promise<User>;
  deleteUserById(id: string): Promise<User | true>;
  checkPassword(password: string, user: User): Promise<true | null>;
  login(email: string): Promise<{ user: User; token: string }>;
}
