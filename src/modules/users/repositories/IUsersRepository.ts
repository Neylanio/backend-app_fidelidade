import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findByLogin(login: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByMail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
