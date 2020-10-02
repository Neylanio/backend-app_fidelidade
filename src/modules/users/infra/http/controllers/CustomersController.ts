import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCustomerService from "@modules/users/services/CreateCustomerService";

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, username, password, surname, whatsapp } = request.body;
    const customerService = container.resolve(CreateCustomerService);

    const customer = await customerService.execute({
      email,
      username,
      password,
      surname,
      whatsapp,
    });

    return response.json(customer);
  }
}
