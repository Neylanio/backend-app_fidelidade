import ICreateEstablishmentDTO from "@modules/establishments/dtos/ICreateEstablishmentDTO";
import Establishment from "@modules/establishments/infra/typeorm/entities/Establishment";
import AppError from "@shared/errors/AppError";
import { uuid } from "uuidv4";
import IEstablishmentsRepository from "../IEstablishmentsRepository";

export default class FakeEstablishmentsRepository implements IEstablishmentsRepository {
  private establishments: Establishment[] = [];

  public async findByName(name: string): Promise<Establishment | undefined> {
    return this.establishments.find(establishment => establishment.name === name);
  }

  public async create(
    {
      name,
      street,
      neighborhood,
      number,
      tel,
      city,
      uf,
      reference_point,
      responsible_user_id,
    } : ICreateEstablishmentDTO): Promise<Establishment> {
      if(this.findByName(name)){
        throw new AppError('Establishment name already registered');
      }

      const establishment = new Establishment();

      Object.assign(establishment, {
        id: uuid(),
        name: establishment,
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

      this.establishments.push(establishment);

      return establishment;
    }
}
