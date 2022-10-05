import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/jwtService';

export default class verifyMatch {
  static tokenValidate = (req: Request, res: Response, next: NextFunction) => {
    const message = 'Token must be a valid token';
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message });
      }
      const validate = jwtService.validateToken(token);
      if (!validate.data || validate.data.role !== 'admin') {
        return res.status(401).json({ message });
      }
    } catch (e) {
      return res.status(401).json({ message });
    }
    next();
  };
}
