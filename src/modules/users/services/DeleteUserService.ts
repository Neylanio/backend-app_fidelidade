import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user: User): Promise<void> {
    const findUser = await this.usersRepository.findByMail(user.email);

    if (!findUser) {
      throw new AppError('User não encontrado!');
    }

    await this.usersRepository.delete(user);
  }
}

export default DeleteUserService;
