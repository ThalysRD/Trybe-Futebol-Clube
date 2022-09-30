import { Request, Response, NextFunction } from 'express';
import userModel from '../database/models/User';
import BCryptService from '../services/BCryptService';

class verifyPassword {
  static passwordExist = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };

  static passwordCorrect = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await userModel.findOne({ where: { email: data.email } });
    if (result) {
      const verify = BCryptService.compare(data.password, result.password);
      if (!verify) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }
    next();
  };
}

export default verifyPassword;
