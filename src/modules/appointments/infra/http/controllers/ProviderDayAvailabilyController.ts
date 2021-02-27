import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderDayAvailabilyService from '@modules/appointments/services/ListProviderDayAvailabilyService';

export default class ProviderDayAvailabilyController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { day, month, year } = request.body;

        const listProviderDayAvailabily = container.resolve(
            ProviderDayAvailabilyService,
        );

        const availability = await listProviderDayAvailabily.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.json(availability);
    }
}
