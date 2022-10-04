import { Request, Response, NextFunction } from 'express';

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
}
