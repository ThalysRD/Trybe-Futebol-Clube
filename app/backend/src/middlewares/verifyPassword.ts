import { Request, Response, NextFunction } from 'express';

const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  if (!data.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default verifyPassword;
