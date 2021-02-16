import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
    });
    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@exemple.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'john.tre@exemple.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'john.qua@exemple.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });
        expect(providers).toEqual([user1, user2]);
    });
});
