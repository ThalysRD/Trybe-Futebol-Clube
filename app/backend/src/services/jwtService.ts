import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUserNoPassword';
import IPayload from '../interfaces/IPayload';

const secret = 'jwt_secret';

const jwtService = {
  generateToken: (user: IUser) => {
    const { id, email, role } = user;
    const token = jwt.sign({ dataUser: {
      id,
      email,
      role,
    } }, secret);

    return token;
  },

  validateToken: (token: string) => {
    try {
      const decode = jwt.verify(token, secret);
      // console.log(decode);
      return decode as IPayload;
    } catch (error) {
      return { message: 'Expired or invalid token' };
    }
  },
};
// { expiresIn: '7d', algorithm: 'HS256' }

export default jwtService;
