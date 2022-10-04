import { Request, Response } from 'express';
import matchesService from '../services/matchesService';
import jwtService from '../services/jwtService';

export default class matchesController {
  static allMatches = async (req: Request, res: Response) => {
    const boolean = req.query.inProgress;
    if (boolean === undefined) {
      const result = await matchesService.allMatches();
      return res.status(200).json(result);
    }
    const inProgress = (boolean === 'true');
    const result = await matchesService.filtredProgress(inProgress);
    return res.status(200).json(result);
  };

  static newMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const data = req.body;
    data.inProgress = true;
    if (token) {
      const validate = jwtService.validateToken(token);
      if (validate.data.role === 'admin') {
        const result = await matchesService.newMatch(data);
        return res.status(201).json(result);
      }
    }
  };

  static finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.headers.authorization;
    if (token) {
      const validate = jwtService.validateToken(token);
      if (validate.data.role === 'admin') {
        const result = await matchesService.finishMatch(id);
        return res.status(200).json(result);
      }
    }
  };

  static updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await matchesService.updateMatch(data, id);
    return res.status(200).json(result);
  };
}
