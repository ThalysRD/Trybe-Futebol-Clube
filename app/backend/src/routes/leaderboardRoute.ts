import { Router } from 'express';
import leaderborderController from '../controllers/leaderborderController';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', leaderborderController.allHome);

export default leaderboardRoute;
