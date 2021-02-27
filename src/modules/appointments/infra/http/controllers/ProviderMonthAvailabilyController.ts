import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderMonthAvailabilyService from '@modules/appointments/services/ListProviderMonthAvailabilyService';

export default class ProviderMonthAvailabilyController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.body;

        const listProviderMonthAvailabily = container.resolve(
            ProviderMonthAvailabilyService,
        );

        const availability = await listProviderMonthAvailabily.execute({
            provider_id,
            month,
            year,
        });

        return response.json(availability);
    }
}
