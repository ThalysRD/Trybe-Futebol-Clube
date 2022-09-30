import { Router } from 'express';
import userController from '../controllers/userController';
import verifyEmail from '../middlewares/verifyEmail';

const userRoute = Router();

userRoute.post('/login', verifyEmail, userController.login);

export default userRoute;
