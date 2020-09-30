import ICreateCustomerDTO from "../dtos/ICreateCustomerDTO";
import Customer from "../infra/typeorm/entities/Customer";

export default interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
}
