import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserServices from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const athenticateUser = container.resolve(AuthenticateUserServices);

        const { user, token } = await athenticateUser.execute({
            email,
            password,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json({ userWithoutPassword, token });
    }
}
