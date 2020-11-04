import ICreateEstablishmentDTO from '@modules/establishments/dtos/ICreateEstablishmentDTO';
import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentsRepository';
import { getRepository, Repository } from 'typeorm';
import Establishment from '../entities/Establishment';

export default class EstablishmentsRepository
  implements IEstablishmentsRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  public async findByName(name: string): Promise<Establishment | undefined> {
    return this.ormRepository.findOne({ name });
  }

  public async create({
    name,
    street,
    neighborhood,
    number,
    tel,
    city,
    uf,
    reference_point,
    responsible_user_id,
  }: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishment = this.ormRepository.create({
      name,
      street,
      neighborhood,
      number,
      tel,
      city,
      uf,
      reference_point,
      active: '0',
      responsible_user_id,
    });

    return this.ormRepository.save(establishment);
  }
}
