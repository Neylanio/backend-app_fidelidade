import { Request, Response } from "express";
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      login,
      password,
    });

    console.log(user);

    delete user.password;
    delete user.updated_at;
    return response.json({ user, token });
  }
}
