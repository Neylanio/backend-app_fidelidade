import ICreateEstablishmentUserDTO from '@modules/establishments/dtos/ICreateEstablishmentUserDTO';
import IEstablishmentUserRepository from '@modules/establishments/repositories/IEstablishmentUserRepository';
import { getRepository, Repository } from 'typeorm';
import Establishment_User from '../entities/Establishment_User';

export default class EstablishmentUserRepository
  implements IEstablishmentUserRepository {
  private ormRepository: Repository<Establishment_User>;

  constructor() {
    this.ormRepository = getRepository(Establishment_User);
  }

  public async create({
    establishment_id,
    user_id,
  }: ICreateEstablishmentUserDTO): Promise<Establishment_User> {
    const establishmentUser = this.ormRepository.create({
      establishment_id,
      user_id,
    });

    return this.ormRepository.save(establishmentUser);
  }
}
