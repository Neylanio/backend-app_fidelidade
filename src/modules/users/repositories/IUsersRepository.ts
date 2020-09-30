import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  findByLogin(login: string): Promise<User | undefined>;
}
