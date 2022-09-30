import { Request, Response, NextFunction } from 'express';

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  if (!data.email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default verifyEmail;
