import userModel from '../database/models/User';
import BCryptService from './BCryptService';
import IUser from '../interfaces/IUser';
import jwtService from './jwtService';

export default class userService {
  public static login = async (data: IUser) => {
    const result = await userModel.findOne({ where: { email: data.email } });
    console.log(result?.password);
    console.log(data.password);
    if (result) {
      const verify = BCryptService.compare(data.password, result.password);
      if (verify) {
        const token = jwtService.generateToken(data.password);
        return token;
      }
    }
  };
}
