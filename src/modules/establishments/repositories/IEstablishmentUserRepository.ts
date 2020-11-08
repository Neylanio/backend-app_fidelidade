import ICreateEstablishmentUserDTO from '../dtos/ICreateEstablishmentUserDTO';
import Establishment_User from '../infra/typeorm/entities/Establishment_User';

export default interface IEstablishmentUserRepository {
  findEstablishment(
    establishment_id: string,
  ): Promise<Establishment_User | undefined>;
  create(data: ICreateEstablishmentUserDTO): Promise<Establishment_User>;
}
