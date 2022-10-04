import { Router } from 'express';
import verifyTeams from '../middlewares/verifyTeams';
import matchesController from '../controllers/matchesController';
import verifyMatch from '../middlewares/verifyMatch';

const matchsRoute = Router();

matchsRoute.get('/matches', matchesController.allMatches);
matchsRoute.post(
  '/matches',
  verifyMatch.tokenValidate,
  verifyTeams.differentTeams,
  verifyTeams.teamExists,
  matchesController.newMatch,
);
matchsRoute.patch('/matches/:id/finish', verifyMatch.tokenValidate, matchesController.finishMatch);
matchsRoute.patch('/matches/:id', verifyMatch.tokenValidate, matchesController.updateMatch);
export default matchsRoute;
