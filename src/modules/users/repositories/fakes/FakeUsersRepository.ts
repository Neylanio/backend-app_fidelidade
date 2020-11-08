import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByLogin(login: string): Promise<User | undefined> {
    return this.users.find(
      user => user.email === login || user.username === login,
    );
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  public async findByMail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async delete(user: User): Promise<void> {
    this.users = this.users.filter(item => item.id !== user.id);
  }
}
