import { Request, Response } from 'express';
import teamModel from '../database/models/Team';

export default class teamsController {
  static allTeams = async (_req: Request, res: Response) => {
    const teams = await teamModel.findAll();
    return res.status(200).json(teams);
  };

  static teamsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      const team = await teamModel.findByPk(id);
      return res.status(200).json(team);
    }
  };
}
