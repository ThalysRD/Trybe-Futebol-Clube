import { Request, Response } from 'express';
import matchModel from '../database/models/Match';
import teamModel from '../database/models/Team';

export default class matchesController {
  static allMatches = async (_req: Request, res: Response) => {
    const result = await matchModel.findAll(
      { include: [
        { model: teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: teamModel, as: 'teamAway', attributes: ['teamName'] },
      ] },
    );
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
