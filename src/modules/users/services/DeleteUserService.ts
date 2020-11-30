import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const findUser = await this.usersRepository.findByMail(email);

    if (!findUser) {
      throw new AppError('User não encontrado!');
    }

    await this.cacheProvider.invalidate(findUser.id);
    await this.usersRepository.delete(findUser);
  }
}

export default DeleteUserService;
