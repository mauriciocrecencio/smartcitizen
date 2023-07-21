import { DataSource } from "typeorm";
import User from "./models/User";

const USERNAME = process.env.POSTGRES_USER || 'docker'
const PASSWORD = process.env.POSTGRES_PASSWORD || 'docker'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || '5432'
const POSTGRES_DB = process.env.POSTGRES_DB || 'auth_users'


export const AppDataSource = new DataSource({
    url:  process.env.URL || `postgres://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${POSTGRES_DB}`,
    // url:  `postgres://docker:docker@localhost:5432/auth_users`,
    type: "postgres",
    // host: process.env.HOST || "localhost",
    // port: Number(process.env.PORT) || 5432,
    // username: process.env.POSTGRES_USER || "docker",
    // password: process.env.POSTGRES_PASSWORD || "docker",
    // database: process.env.POSTGRES_DB || "auth_users",
    synchronize: true,
    // logging: true,
    entities: [User],
    // subscribers: [],
    // migrations: [],
})