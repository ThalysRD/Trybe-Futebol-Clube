import * as jwt from 'jsonwebtoken';

const secret = 'jwt_secret';

const jwtService = {
  generateToken: (password: string) => {
    const token = jwt.sign({ data: password }, secret, { expiresIn: '7d', algorithm: 'HS256' });
    return token;
  },

  validateToken: (token: string) => {
    try {
      const decode = jwt.verify(token, secret);
      return decode;
    } catch (error) {
      return { message: 'Expired or invalid token' };
    }
  },
};
export default jwtService;
