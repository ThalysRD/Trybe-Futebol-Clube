import { Router } from 'express';
import teamsController from '../controllers/teamsController';

const teamsRoute = Router();

teamsRoute.get('/teams', teamsController.allTeams);
teamsRoute.get('/teams/:id', teamsController.teamsById);

export default teamsRoute;
