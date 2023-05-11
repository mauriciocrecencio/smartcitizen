import { DataSource } from "typeorm";
import User from "./models/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "smartcitizen",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})