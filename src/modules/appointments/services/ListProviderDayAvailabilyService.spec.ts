import FakeAppointementsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilyService from './ListProviderDayAvailabilyService';

let fakeAppointementsRepository: FakeAppointementsRepository;
let listProviderDayAvailabily: ListProviderDayAvailabilyService;

describe('ListProviderMonthAvailabily', () => {
    beforeEach(() => {
        fakeAppointementsRepository = new FakeAppointementsRepository();
        listProviderDayAvailabily = new ListProviderDayAvailabilyService(
            fakeAppointementsRepository,
        );
    });

    it('should be able to list the day availability from provider', async () => {
        await fakeAppointementsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0, 0),
        });

        await fakeAppointementsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0, 0),
        });

        // retorna uma data
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        const availability = await listProviderDayAvailabily.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
            day: 20,
        });
        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        );
    });
});
