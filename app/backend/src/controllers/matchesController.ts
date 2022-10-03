import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

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

  //   static newMatch = async (req: Request, res: Response) => {
  //     const data = req.body
  //     return res.status(200).json()
  //   }

//   static matchesFinish = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     return res.status(200).json()
//   };
}
