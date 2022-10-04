import { Router } from 'express';
import verifyTeams from '../middlewares/verifyTeams';
import matchesController from '../controllers/matchesController';

const matchsRoute = Router();

matchsRoute.get('/matches', matchesController.allMatches);
matchsRoute.post('/matches', verifyTeams.differentTeams, matchesController.newMatch);
// matchsRoute.patch('matches/:id/finish', matchesController.finishMatch);

export default matchsRoute;
