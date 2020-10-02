import { Router } from 'express';
// import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';

const establishmentsRouter = Router();

establishmentsRouter.post('/', async (request, response) => {
  // const {
  //   email,
  //   username,
  //   password,
  //   surname,
  //   establishment,
  //   street,
  //   neighborhood,
  //   number,
  //   uf,
  //   reference_point,
  // } = request.body;

  // const establishmentService = new CreateEstablishmentService();

  // const establishmentt = await establishmentService.execute({
  //   email,
  //   username,
  //   password,
  //   surname,
  //   establishment,
  //   street,
  //   neighborhood,
  //   number,
  //   uf,
  //   reference_point: reference_point === undefined ? '' : reference_point,
  // });

  // return response.json(establishmentt);
});

export default establishmentsRouter;
