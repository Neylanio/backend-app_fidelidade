import ICreateEstablishmentUserDTO from '../dtos/ICreateEstablishmentUserDTO';
import Establishment_User from '../infra/typeorm/entities/Establishment_User';

export default interface IEstablishmentUserRepository {
  create(data: ICreateEstablishmentUserDTO): Promise<Establishment_User>;
}
