import { Router } from 'express';
import adminRouter from './admin.routes';

import customersRouter from './customers.routes';
import establishmentsRouter from './establishments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import customerRouter from '@modules/users/infra/http/routes/customer.routes';

import establishmentRouter from '@modules/establishments/infra/http/routes/establishment.routes';

const routes = Router();

//Default ROUTES OK

routes.use('/customers', customersRouter);// Cadastrar customers
routes.use('/establishments', establishmentsRouter);// Cadastrar establishment and manager employee
routes.use('/sessions', sessionsRouter);// Login

//-----------------------------------------------------------------------


//Admin ROUTES

routes.use('/admin', adminRouter);
// Listar establishments
// Ativar ou inativar establishment
// Listar employees dos establishments
// Listar promotions
// Listar customers
// Listar logs de erros


//-----------------------------------------------------------------------


//Customer ROUTES

routes.use('/customer', customerRouter);
// Listar seus dados
// Atualizar dados do Customer
// Listar Establishments vinculados
// Listar promocoes dos Establishments vinculados

//-----------------------------------------------------------------------

//Establishment ROUTES
routes.use('/establishment', establishmentRouter);
// Listar seu dados
// Atualizar dados do Establishment
// Listar, Cadastrar e Atualizar employees
// Listar customers
// Listar, Cadastrar e Atualizar promocoes (manager)
// Adicionar stamps no customer
// Atualizar dados do Employee
// Listar logs de acesso

export default routes;
