import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => { 
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) { 
    return res.status(404).json({ message: 'User not found' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
   if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  } 

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.status(200).json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
