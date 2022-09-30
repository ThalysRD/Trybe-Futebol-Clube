import userModel from '../database/models/User';
import BCryptService from './BCryptService';
import IUser from '../interfaces/IUser';
import jwtService from './jwtService';
import IUserNoPassword from '../interfaces/IUserNoPassword';

export default class userService {
  public static login = async (data: IUser) => {
    const result = await userModel.findOne({ where: { email: data.email } });
    if (result) {
      const verify = BCryptService.compare(data.password, result.password);
      if (verify) {
        const noPassword: IUserNoPassword = result;
        delete noPassword.password;
        const token = jwtService.generateToken(noPassword);
        return token;
      }
    }
  };
}
