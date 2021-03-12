import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class Profileconroller {
    public async show(request: Request, response: Response): Promise<Response> {
        try {
            const user_id = request.user.id;

            const ShowProfile = container.resolve(ShowProfileService);

            const user = await ShowProfile.execute({
                user_id,
            });

            //     const userWithoutPassword = {
            //         id: user.id,
            //         name: user.name,
            //         email: user.email,
            //         created_at: user.created_at,
            //         updated_at: user.updated_at,
            //     };

            //     return response.json(userWithoutPassword);
            return response.json(classToClass(user));
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const user_id = request.user.id;
            const { name, email, old_password, password } = request.body;

            const updateProfile = container.resolve(UpdateProfileService);

            const user = await updateProfile.execute({
                user_id,
                name,
                email,
                old_password,
                password,
            });

            // const userWithoutPassword = {
            //     id: user.id,
            //     name: user.name,
            //     email: user.email,
            //     created_at: user.created_at,
            //     updated_at: user.updated_at,
            // };

            // return response.json(userWithoutPassword);
            return response.json(classToClass(user));
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
