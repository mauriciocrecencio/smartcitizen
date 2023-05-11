import { DataSource } from "typeorm";
import User from "./models/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "docker",
    database: "auth_users",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})