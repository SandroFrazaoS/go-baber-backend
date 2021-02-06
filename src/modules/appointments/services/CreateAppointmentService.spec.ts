import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '124568979',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('124568979');
    });

    it('should not be able to create a new appointment on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '124568979',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '124568979',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

// it = test
// test('sum two numbers', () => {
//     expect(1 + 2).toBe(3);
// });
