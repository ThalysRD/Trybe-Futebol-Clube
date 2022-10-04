import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const matchsRoute = Router();

matchsRoute.get('/matches', matchesController.allMatches);
matchsRoute.post('/matches', matchesController.newMatch);
// matchsRoute.patch('matches/:id/finish', matchesController.matchesFinish);

export default matchsRoute;
