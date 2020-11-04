import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEstablishmentsRepository from '../repositories/IEstablishmentsRepository';
import IEstablishmentUserRepository from '../repositories/IEstablishmentUserRepository';
import IResponseCreateEstablishmentDTO from '../dtos/IResponseCreateEstablishmentDTO';
import IRequestCreateEstablishmentDTO from '../dtos/IRequestCreateEstablishmentDTO';

@injectable()
export default class CreateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,

    @inject('EstablishmentUserRepository')
    private establishmentUserRepository: IEstablishmentUserRepository,
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
  }: IRequestCreateEstablishmentDTO): Promise<IResponseCreateEstablishmentDTO> {
    const checkEstablishmentName = await this.establishmentsRepository.findByName(
      establishment,
    );

    if (checkEstablishmentName) {
      throw new AppError('Establishment name already used');
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

    await this.establishmentUserRepository.create({
      establishment_id: establishmentId.id,
      user_id: employee_id,
    });

    return {
      establishment,
    };
  }
}
