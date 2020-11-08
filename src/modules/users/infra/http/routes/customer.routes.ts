import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';

const customerRouter = Router();
const customersController = new CustomersController();

// Customer data
// --> Listar dados do customer
// Deve listar customers ligados a establishments
// customerRouter.get('/', ensureAuthenticated, async (request, response) => {});

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required().min(6),
      surname: Joi.string(),
      whatsapp: Joi.string(),
    },
  }),
  customersController.create,
);

// --> Atulizar dados do customer
customerRouter.put('/', ensureAuthenticated, async (request, response) => {
  return response.send();
});

// --> Establishments vinculados
customerRouter.get(
  '/establishments',
  ensureAuthenticated,
  async (request, response) => {
    return response.send();
  },
);

// Listar promocoes dos establishments vinculados
customerRouter.get(
  '/promotions',
  ensureAuthenticated,
  async (request, response) => {
    // Listar cards
    return response.send();
  },
);

export default customerRouter;
