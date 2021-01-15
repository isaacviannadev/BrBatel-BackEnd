import User from '../models/user';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUsersService {
  public async execute({ email, password }: Request): Promise<Response> {
    const user = {
      email: 'luke@shop.com',
      password: '123456',
    };

    if (email !== user.email) {
      throw new Error('Incorrect credentials - try again');
    }

    if (password !== user.password) {
      throw new Error('Incorrect credentials - try again');
    }

    return { user };
  }
}
export default AuthenticateUsersService;
