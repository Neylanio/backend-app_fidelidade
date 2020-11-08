import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import EstablishmentsController from '../controllers/EstablishmentsController';

const establishmentRouter = Router();
const establishmentController = new EstablishmentsController();

// Establishment
establishmentRouter.get('/', ensureAuthenticated, async (request, response) => {
  const establishment = '';
  return response.json(establishment);
});

establishmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required().min(6),
      surname: Joi.string(),
      whatsapp: Joi.string(),
      city: Joi.string(),
      establishment: Joi.string().required(),
      neighborhood: Joi.string(),
      number: Joi.string(),
      street: Joi.string(),
      tel: Joi.string(),
      uf: Joi.string().length(2),
      reference_point: Joi.string(),
    },
  }),
  establishmentController.create,
);

establishmentRouter.put('/', ensureAuthenticated, async (request, response) => {
  const establishment = '';
  return response.json(establishment);
});

// Employees --> preciso ajeitar
establishmentRouter.get(
  '/employees',
  ensureAuthenticated,
  async (request, response) => {
    return response.json({});
  },
);

// establishmentRouter.put(
//   '/employees',
//   ensureAuthenticated,
//   async (request, response) => {},
// );

establishmentRouter.post(
  '/employees',
  ensureAuthenticated,
  async (request, response) => {
    return response.json({});
  },
);

// Listar customers
establishmentRouter.get(
  '/customers',
  ensureAuthenticated,
  async (request, response) => {
    // Listar cards dos customers
  },
);

// // Listar, Cadastrar e Atualizar promocoes (manager)
// establishmentRouter.get(
//   '/promotions',
//   ensureAuthenticated,
//   async (request, response) => {},
// );

// establishmentRouter.post(
//   '/promotions',
//   ensureAuthenticated,
//   async (request, response) => {},
// );

// establishmentRouter.put(
//   '/promotions',
//   ensureAuthenticated,
//   async (request, response) => {},
// );

// // Adicionar stamps no customer
// establishmentRouter.post(
//   '/stamps',
//   ensureAuthenticated,
//   async (request, response) => {},
// );

// // Atualizar dados do Employee
// establishmentRouter.get(
//   '/config',
//   ensureAuthenticated,
//   async (request, response) => {},
// );

// establishmentRouter.put(
//   '/config',
//   ensureAuthenticated,
//   async (request, response) => {},
// );

// Listar logs de acesso
establishmentRouter.get(
  '/logs',
  ensureAuthenticated,
  async (request, response) => {
    // somente se o usuario for manager
  },
);

export default establishmentRouter;
