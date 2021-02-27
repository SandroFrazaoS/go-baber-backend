import FakeAppointementsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointementsRepository: FakeAppointementsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointementsRepository = new FakeAppointementsRepository();
        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointementsRepository,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointementsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0, 0),
        });

        const appointment2 = await fakeAppointementsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0, 0),
        });

        const appointements = await listProviderAppointments.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });
        expect(appointements).toEqual([appointment1, appointment2]);
    });
});
