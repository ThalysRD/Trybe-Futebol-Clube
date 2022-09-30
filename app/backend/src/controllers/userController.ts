import { Request, Response } from 'express';
import jwtService from '../services/jwtService';
import UsersService from '../services/UserService';

export default class userController {
  public static login = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await UsersService.login(data);
    return res.status(200).json({ token: result });
  };

  static validate = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
      const result = jwtService.validateToken(token);
      const { data } = result;
      return res.status(200).json({ role: data.role });
    }
    return res.status(404).json({ message: 'Token inválido' });
  };
}
