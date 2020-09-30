import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { compare } from 'bcryptjs';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByLogin(login);

    if (!user) throw new AppError('Credenciais Incorretas', 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Credenciais Incorretas', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
