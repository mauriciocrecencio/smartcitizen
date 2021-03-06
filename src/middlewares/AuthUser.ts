import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ message: "Authorization token is missing from request headers" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(String(token), "secret");
    const { id } = data as TokenPayload;
    req.id = id;
    next();
  } catch {
    return res.status(401).json({ message: "Incorrect password or token authentication" });
  }
}
