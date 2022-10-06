import matchModel from '../database/models/Match';
import teamModel from '../database/models/Team';

export default class leaderboardServiceAway {
  static allMatches = async () => {
    const allMatches = await matchModel.findAll({ where: {
      inProgress: false,
    },
    include:
            [{ model: teamModel, as: 'teamHome', attributes: ['teamName'] },
              { model: teamModel, as: 'teamAway', attributes: ['teamName'] }],
    });
    return allMatches;
  };

  static away = async () => {
    const allMatches = await this.allMatches();
    const allTeam = await teamModel.findAll();
    const result = allTeam.map(({ teamName }) => {
      const obj = { name: teamName, gc: 0, ga: 0, wons: 0, draws: 0, loses: 0 };
      const filtred = allMatches.filter(({ teamAway }) => obj.name === teamAway.teamName);
      filtred.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        obj.ga += homeTeamGoals;
        obj.gc += awayTeamGoals;
        if (homeTeamGoals < awayTeamGoals) obj.wons += 1;
        if (homeTeamGoals === awayTeamGoals) obj.draws += 1;
        if (homeTeamGoals > awayTeamGoals) obj.loses += 1;
      });
      return obj;
    });
    return result;
  };

  static awayResult = async () => {
    const awayTeams = await this.away();
    const result = awayTeams.map((team) => {
      const totalGames = team.wons + team.draws + team.loses;
      const efficiency = (team.wons * 3 + team.draws) / (totalGames * 3);
      return {
        name: team.name,
        totalPoints: team.wons * 3 + team.draws,
        totalGames,
        totalVictories: team.wons,
        totalDraws: team.draws,
        totalLosses: team.loses,
        goalsFavor: team.gc,
        goalsOwn: team.ga,
        goalsBalance: team.gc - team.ga,
        efficiency: (efficiency * 100).toFixed(2),
      };
    });
    return result;
  };

  static awayResultSorted = async () => {
    const result = await this.awayResult();
    const victories = result.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;

      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;

      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;

      if (a.goalsOwn > b.goalsOwn) return 1;
      if (a.goalsOwn < b.goalsOwn) return -1;

      return 0;
    });

    return victories;
  };
}
