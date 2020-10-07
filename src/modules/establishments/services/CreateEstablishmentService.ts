import { inject, injectable } from "tsyringe";

import IRequestCreateEstablishmentDTO from "../dtos/IRequestCreateEstablishmentDTO";
import IResponseCreateEstablishmentDTO from "../dtos/IResponseCreateEstablishmentDTO";

import IEstablishmentsRepository from "../repositories/IEstablishmentsRepository";

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from "@modules/users/providers/HashProvider/implementations/BCryptHashProvider";
import CreateEmployeeService from "@modules/users/services/CreateEmployeeService";
import AppError from "@shared/errors/AppError";

@injectable()
export default class CreateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ){}

  public async execute(
    {
      avatar,
      email,
      establishment,
      neighborhood,
      number,
      password,
      reference_point,
      street,
      surname,
      tel,
      city,
      uf,
      username,
      whatsapp,
    }: IRequestCreateEstablishmentDTO): Promise<IResponseCreateEstablishmentDTO> {

      const usersRepository = new UsersRepository();
      const bCryptHashProvider = new BCryptHashProvider();
      const createEmployeeService = new CreateEmployeeService(usersRepository, bCryptHashProvider);

      const employee = await createEmployeeService.execute({
        avatar,
        email,
        password,
        surname,
        type_employee: 'manager',
        username,
        whatsapp,
      });

      const checkEstablishmentName = await this.establishmentsRepository.findByName(establishment);

      if(checkEstablishmentName){
        throw new AppError('Establishment name already used');
      }

      await this.establishmentsRepository.create({
        name: establishment,
        neighborhood,
        number,
        reference_point,
        street,
        tel,
        city,
        uf,
        responsible_user_id: employee.id,
      });

      return {
        email,
        establishment,
        username,
      }
    }
}
