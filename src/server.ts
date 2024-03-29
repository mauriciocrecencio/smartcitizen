import "reflect-metadata"
import express from "express";
import "./database";
import usersRoutes from "./routes/users.routes";

var cors = require('cors')

const app = express();

app.use(express.json());

app.use(cors());

app.use("/usuario", usersRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));
