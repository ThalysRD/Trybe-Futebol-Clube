import { Request, Response } from 'express';
import leaderboardServiceAway from '../services/leaderboardServiceAway';
import leaderboardServiceHome from '../services/leaderboardServiceHome';

export default class leaderborderController {
  static allHome = async (_req: Request, res: Response) => {
    const result = await leaderboardServiceHome.homeResultSorted();
    return res.status(200).json(result);
  };

  static allAway = async (_req: Request, res: Response) => {
    const result = await leaderboardServiceAway.awayResultSorted();
    return res.status(200).json(result);
  };

  // static allTeams = async (_req: Request, res: Response) => {
  //   const result = await leaderboardService.allTeamsSorted();
  //   return res.status(200).json(result);
  // }
}
