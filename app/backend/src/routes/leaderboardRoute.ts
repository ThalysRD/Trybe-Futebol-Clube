import { Router } from 'express';
import leaderborderController from '../controllers/leaderborderController';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', leaderborderController.allHome);
leaderboardRoute.get('/leaderboard/away', leaderborderController.allAway);
// leaderboardRoute.get('/leaderboard', leaderborderController.allTeams);

export default leaderboardRoute;
