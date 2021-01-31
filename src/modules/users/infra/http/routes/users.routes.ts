import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticad from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

// cadastro de usuario
usersRouter.post('/', usersController.create);

// para alterar seu avatar tem que se autenticar
usersRouter.patch(
    '/avatar',
    ensureAuthenticad,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
