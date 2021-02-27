import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppintmentsController from '../controllers/ProviderAppointementsController';

const appointemntsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppintmentsController = new ProviderAppintmentsController();

appointemntsRouter.use(ensureAuthenticated);

appointemntsRouter.post('/', appointmentsController.create);
appointemntsRouter.get('/me', providerAppintmentsController.index);

export default appointemntsRouter;
