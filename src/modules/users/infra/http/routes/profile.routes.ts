import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticad from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticad);

profileRouter.get('/', profileController.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.when('old_password', {
                is: Joi.exist(),
                then: Joi.required(),
            }),
            password_confirmation: Joi.when('password', {
                is: Joi.exist(),
                then: Joi.valid(Joi.ref('password')).required(),
            }),
        },
    }),
    profileController.update,
);

export default profileRouter;
