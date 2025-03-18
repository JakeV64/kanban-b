import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  const secretKey = process.env.JWT_SECRET || "";

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }

    req.user = user as JwtPayload; 
    next();
  });
};
