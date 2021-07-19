import express from "express";
import "../database";
import usersRoutes from "../routes/users.routes";

const app = express();

app.use(express.json());

app.use("/usuario", usersRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));
