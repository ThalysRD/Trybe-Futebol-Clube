import { Router } from 'express';
import userController from '../controllers/userController';
import verifyEmail from '../middlewares/verifyEmail';
import verifyPassword from '../middlewares/verifyPassword';

const userRoute = Router();

userRoute.post(
  '/login',
  verifyEmail.emailExist,
  verifyEmail.emailIsCorrect,
  verifyPassword.passwordExist,
  verifyPassword.passwordCorrect,
  userController.login,
);

userRoute.get('/login/validate', userController.validate);

export default userRoute;
