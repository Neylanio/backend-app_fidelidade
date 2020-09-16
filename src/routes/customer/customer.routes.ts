import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const customerRouter = Router();
customerRouter.use(ensureAuthenticated);

// Customer data
// --> Atulizar dados do customer


// Establishments vinculados



// Listar promocoes dos establishments vinculados

export default customerRouter;
