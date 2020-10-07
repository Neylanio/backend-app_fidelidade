import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IEstablishmentsRepository from '@modules/establishments/repositories/IEstablishmentsRepository';
import EstablishmentsRepository from '@modules/establishments/infra/typeorm/repositories/EstablishmentsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IEstablishmentsRepository>('EstablishmentsRepository', EstablishmentsRepository);
