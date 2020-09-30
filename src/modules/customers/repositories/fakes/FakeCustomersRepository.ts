import ICustomersRepository from "@modules/customers/repositories/ICustomersRepository";
import ICreateCustomerDTO from "@modules/customers/dtos/ICreateCustomerDTO";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { uuid } from "uuidv4";

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create(data: ICreateCustomerDTO): Promise<Customer> {

    const customer = new Customer();
    Object.assign(customer, { id: uuid() }, data);

    this.customers.push(customer);

    return customer;
  }

}
