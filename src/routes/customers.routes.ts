import Router, { Request, Response } from 'express';
import { validationResult, checkSchema } from 'express-validator';
import CreateCustomerService from '../services/CreateCustomer';

const customersRouter = Router();

customersRouter.get('/', (request, response) => {
  return response.json({ ok: true });
});

customersRouter.post(
  '/',
  checkSchema({
    email: {
      isEmail: {
        negated: false,
      },
    },
    password: {
      isLength: {
        options: {
          min: 6,
        },
      },
    },
  }),
  async (request: Request, response: Response) => {
    const { email, username, password, surname, whatsapp } = request.body;

    const newUsername = username.toLowerCase();

    try {
      validationResult(request).throw();

      const customerService = new CreateCustomerService();

      const customer = await customerService.execute({
        email,
        username: newUsername,
        password,
        surname,
        whatsapp,
      });

      return response.json(customer);
    } catch (error) {
      switch (error.param) {
        case 'email':
          return response.status(401).json({ message: 'Email inválido' });
          break;

        case 'password':
          return response.status(401).json({ message: 'Senha inválida' });
          break;

        default:
          return response
            .status(401)
            .json({ message: 'Erro ao tentar cadastrar' });
          break;
      }
    }
  },
);

export default customersRouter;
