import * as bcrypt from 'bcryptjs';

export default class BCryptService {
  private static salt = 10;

  public static encrypt(password: string) : string {
    return bcrypt.hashSync(password, this.salt);
  }

  public static compare(Password: string, hash: string) : boolean {
    return bcrypt.compareSync(Password, hash);
  }
}
