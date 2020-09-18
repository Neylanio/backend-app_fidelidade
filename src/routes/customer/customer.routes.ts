import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const customerRouter = Router();
customerRouter.use(ensureAuthenticated);

// Customer data
// --> Listar dados do customer
customerRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const user = await userRepository
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.customer', 'customer')
    .select([
      'user.email',
      'user.username',
      'user.avatar',
      'user.type',
      'user.created_at' as 'start_date',
      'customer.surname',
      'customer.whatsapp',
    ])
    .where('user.type = :type AND user.id = :id', {type: 'customer', id: request.user.id })
    .getOne();

  if(user !== undefined)
    return response.json(user);

  return response.status(404).json({ message: 'Error' });

});


// --> Atulizar dados do customer
customerRouter.put('/', async (request, response) => {
  return response.send();
});


// --> Establishments vinculados
customerRouter.get('/establishments', async (request, response) => {
  return response.send();
});


// Listar promocoes dos establishments vinculados
customerRouter.get('/promotions', async (request, response) => {
  // Listar cards
  return response.send();
});

export default customerRouter;
