import IMatch from '../interfaces/IMatch';
import matchModel from '../database/models/Match';
import teamModel from '../database/models/Team';
import IUpdateMatch from '../interfaces/IUpdateMatch';

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

  static finishMatch = async (id: string) => {
    const result = await matchModel.update({ inProgress: false }, { where: { id },
    });
    if (result) {
      const message = { message: 'Finished' };
      return message;
    }
  };

  static updateMatch = async ({ homeTeamGoals, awayTeamGoals } : IUpdateMatch, id: string) => {
    const result = await matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (result[0] === 1) {
      return { message: 'Updated' };
    }
  };
}
