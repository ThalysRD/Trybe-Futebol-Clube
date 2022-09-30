import { Router } from 'express';
import userController from '../controllers/userController';
import verifyEmail from '../middlewares/verifyEmail';
import verifyPassword from '../middlewares/verifyPassword';

const userRoute = Router();

userRoute.post('/login', verifyEmail, verifyPassword, userController.login);

export default userRoute;
