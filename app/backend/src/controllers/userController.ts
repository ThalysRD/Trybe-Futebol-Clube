import { Request, Response } from 'express';
import UsersService from '../services/UserService';

export default class userController {
  public static login = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await UsersService.login(data);
    return res.status(200).json({ token: result });
  };
}
