import awayService from './leaderboardServiceAway';
import homeService from './leaderboardServiceHome';

export default class leaderboardService {
  static allTeams = async () => {
    const away = await awayService.away();
    const home = await homeService.home();
    const sum = away.map((team) => {
      const obj = { name: team.name, gc: 0, ga: 0, wons: 0, draws: 0, loses: 0 };

      home.forEach((teams) => {
        if (team.name === teams.name) {
          obj.gc = team.gc + teams.gc;
          obj.ga = team.ga + teams.ga;
          obj.wons = team.wons + teams.wons;
          obj.draws = team.draws + teams.draws;
          obj.loses = team.loses + teams.loses;
        }
      });
      return obj;
    });
    return sum;
  };

  static allTeamsResult = async () => {
    const allTeams = await this.allTeams();
    const result = allTeams.map((team) => {
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

  static allTeamsResultSorted = async () => {
    const result = await this.allTeamsResult();
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
