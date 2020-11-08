import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import IRequestCreateEstablishmentDTO from '../dtos/IRequestCreateEstablishmentDTO';
import Establishment from '../infra/typeorm/entities/Establishment';

@injectable()
export default class CreateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute({
    establishment,
    street,
    neighborhood,
    number,
    tel,
    city,
    uf,
    reference_point,
    employee_id,
  }: IRequestCreateEstablishmentDTO): Promise<Establishment> {
    const checkEstablishmentName = await this.establishmentsRepository.findByName(
      establishment,
    );

    if (checkEstablishmentName) {
      throw new AppError('Estabelecimento já cadastrado!!');
    }

    const establishmentId = await this.establishmentsRepository.create({
      name: establishment,
      neighborhood,
      number,
      reference_point,
      street,
      tel,
      city,
      uf,
      responsible_user_id: employee_id,
    });

    return establishmentId;
  }
}
