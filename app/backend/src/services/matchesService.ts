import IMatch from '../interfaces/IMatch';
import matchModel from '../database/models/Match';
import teamModel from '../database/models/Team';

export default class matchesService {
  static allMatches = async () => {
    const result = await matchModel.findAll(
      { include: [
        { model: teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: teamModel, as: 'teamAway', attributes: ['teamName'] },
      ] },
    );
    return result;
  };

  static filtredProgress = async (inProgress: boolean) => {
    const result = await matchModel.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return result;
  };

  static newMatch = async (data: IMatch) => {
    const result = await matchModel.create(data);
    return result;
  };
}
