import { Request, Response, NextFunction } from "express";

export default function checkPassword(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;
  if (typeof password === "number") {
    return res.status(401).json({ message: "Password must contain numbers and letters" });
  }
  next();
}
