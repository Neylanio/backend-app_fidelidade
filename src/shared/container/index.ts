import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentsRepository';
import EstablishmentsRepository from '@modules/establishments/infra/typeorm/repositories/EstablishmentsRepository';

import IEstablishmentUserRepository from '@modules/establishments/repositories/IEstablishmentUserRepository';
import EstablishmentUserRepository from '@modules/establishments/infra/typeorm/repositories/EstablishmentUserRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IEstablishmentsRepository>(
  'EstablishmentsRepository',
  EstablishmentsRepository,
);

container.registerSingleton<IEstablishmentUserRepository>(
  'EstablishmentUserRepository',
  EstablishmentUserRepository,
);
