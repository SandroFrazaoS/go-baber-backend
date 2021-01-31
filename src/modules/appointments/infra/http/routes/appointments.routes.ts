import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointemntsRouter = Router();
const appointmentsController = new AppointmentsController();

appointemntsRouter.use(ensureAuthenticated);

appointemntsRouter.post('/', appointmentsController.create);

export default appointemntsRouter;
