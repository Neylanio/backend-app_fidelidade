import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: [{ email: login }, { username: login }],
    });

    return user;
  }
}
