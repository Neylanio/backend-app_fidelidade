import { getRepository, Repository } from "typeorm";

import ICustomersRepository from "@modules/customers/repositories/ICustomersRepository";
import Customer from "../entities/Customer";
import ICreateCustomerDTO from "@modules/customers/dtos/ICreateCustomerDTO";

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ surname, whatsapp, user_id, active }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      surname,
      whatsapp,
      user_id,
      active,
    });

    return this.ormRepository.save(customer);
  }

}
