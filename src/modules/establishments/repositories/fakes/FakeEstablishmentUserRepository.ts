import ICreateEstablishmentUserDTO from '@modules/establishments/dtos/ICreateEstablishmentUserDTO';
import Establishment_User from '@modules/establishments/infra/typeorm/entities/Establishment_User';
import { uuid } from 'uuidv4';
import IEstablishmentUserRepository from '../IEstablishmentUserRepository';

export default class FakeEstablishmentUserRepository
  implements IEstablishmentUserRepository {
  private establishments_user: Establishment_User[] = [];

  public async findEstablishment(
    establishment_id: string,
  ): Promise<Establishment_User | undefined> {
    return this.establishments_user.find(
      item => item.establishment_id === establishment_id,
    );
  }

  public async create({
    establishment_id,
    user_id,
  }: ICreateEstablishmentUserDTO): Promise<Establishment_User> {
    const establishmentUser = new Establishment_User();

    Object.assign(establishmentUser, {
      id: uuid(),
      establishment_id,
      user_id,
    });

    this.establishments_user.push(establishmentUser);

    return establishmentUser;
  }
}
