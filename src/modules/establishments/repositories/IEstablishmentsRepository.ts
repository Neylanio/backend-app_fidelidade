import ICreateEstablishmentDTO from "../dtos/ICreateEstablishmentDTO";
import Establishment from "../infra/typeorm/entities/Establishment";

export default interface IEstablishmentsRepository {
  findByName(name: string): Promise<Establishment | undefined>;
  create(data: ICreateEstablishmentDTO): Promise<Establishment>;
}
