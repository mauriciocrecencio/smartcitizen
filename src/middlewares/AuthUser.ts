// Tem que colocar no .env
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "secret");
    console.log(data);
    const { id } = data;
    req.id = id;
    next();
  } catch {
    return res.sendStatus(401);
  }
}
