import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestCreateEstablishmentUserDTO from '../dtos/IRequestCreateEstablishmentUserDTO';
import IEstablishmentUserRepository from '../repositories/IEstablishmentUserRepository';

@injectable()
class CreateEstablishmentUserRepository {
  constructor(
    @inject('EstablishmentUserRepository')
    private establishmentUserRepository: IEstablishmentUserRepository,
  ) {}

  public async execute({
    establishment_id,
    user_id,
  }: IRequestCreateEstablishmentUserDTO): Promise<void> {
    const findEstablishmentUser = await this.establishmentUserRepository.findEstablishment(
      establishment_id,
    );

    if (findEstablishmentUser) {
      throw new AppError('Erro, Estabelecimento já cadastrado!!');
    }

    await this.establishmentUserRepository.create({
      establishment_id,
      user_id,
    });
  }
}

export default CreateEstablishmentUserRepository;
