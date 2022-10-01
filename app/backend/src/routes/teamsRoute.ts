import { Router } from 'express';
import teamsController from '../controllers/teamsController';

const teamsRoute = Router();

teamsRoute.get('/teams', teamsController.allTeams);

export default teamsRoute;
