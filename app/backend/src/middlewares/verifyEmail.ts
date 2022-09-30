import { Request, Response, NextFunction } from 'express';
import userModel from '../database/models/User';

class verifyEmail {
  static emailExist = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };

  static emailIsCorrect = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const email = await userModel.findOne({ where: { email: data.email } });
    if (!email) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}

export default verifyEmail;
