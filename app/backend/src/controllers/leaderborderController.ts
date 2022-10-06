import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

export default class leaderborderController {
  static allHome = async (_req: Request, res: Response) => {
    const result = await leaderboardService.homeResultSorted();
    return res.status(200).json(result);
  };
}
