import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
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

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({username});
    return user;
  }

  public async findByMail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({email});
    return user;
  }


  public async create({ email, username, password, type, type_employee, surname, whatsapp, active }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      username,
      password,
      type,
      type_employee,
      surname,
      whatsapp,
      active,
    });

    return this.ormRepository.save(user);
  }

}
