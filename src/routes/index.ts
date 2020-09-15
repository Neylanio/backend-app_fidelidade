import { Router } from 'express';
import adminRouter from './admin/admin.routes';

import customersRouter from './default/customers.routes';
import employeesRouter from './establishment/employees.routes';
import establishmentsRouter from './default/establishments.routes';
import sessionsRouter from './default/sessions.routes';

import customerRouter from './customer/customer.routes';

import establishmentRouter from './establishment/establishment.routes';

const routes = Router();

//Admin SUBDOMAIN
routes.use('/admin', adminRouter);


//Default SUBDOMAINS
routes.use('/customers', customersRouter);
routes.use('/employees', employeesRouter);
routes.use('/establishments', establishmentsRouter);
routes.use('/sessions', sessionsRouter);


//Customer SUBDOMAINS
routes.use('/customer', customerRouter);


//Establishment SUBDOMAINS
routes.use('/establishment', establishmentRouter);


export default routes;
