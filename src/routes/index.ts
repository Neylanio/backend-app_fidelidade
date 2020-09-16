import { Router } from 'express';
import adminRouter from './admin/admin.routes';

import customersRouter from './default/customers.routes';
import establishmentsRouter from './default/establishments.routes';
import sessionsRouter from './default/sessions.routes';

import customerRouter from './customer/customer.routes';

import establishmentRouter from './establishment/establishment.routes';

const routes = Router();

//Admin SUBDOMAIN
routes.use('/admin', adminRouter);


//Default SUBDOMAINS
routes.use('/customers', customersRouter);// Cadastrar customers
routes.use('/establishments', establishmentsRouter);// Cadastrar establishment and manager employee
routes.use('/sessions', sessionsRouter);// Login


//Customer SUBDOMAINS
routes.use('/customer', customerRouter);
// Atualizar dados do Customer
// Listar Establishments vinculados
// Listar promocoes dos Establishments vinculados


//Establishment SUBDOMAINS
routes.use('/establishment', establishmentRouter);
// Listar e Cadastrar employees
// Listar e Cadastrar promocoes (manager)
// Adicionar Selos
// Atualizar dados do Establishment
// Atualizar dados do Employee

export default routes;
