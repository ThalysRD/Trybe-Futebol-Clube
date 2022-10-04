import { Request, Response, NextFunction } from 'express';
import teamsModel from '../database/models/Team';

export default class verifyTeams {
  static differentTeams = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (data.homeTeam === data.awayTeam) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    next();
  };

  static teamExists = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const allTeams = await teamsModel.findAll();
    const homeTeam = allTeams.some(({ id }) => id === data.homeTeam);
    const awayTeam = allTeams.some(({ id }) => id === data.awayTeam);
    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
