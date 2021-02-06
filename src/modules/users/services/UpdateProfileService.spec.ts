import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@exemple.com',
            password: '123456',
        });

        const updateUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Treeee',
            email: 'johntre@exemple.com',
        });
        expect(updateUser.name).toBe('John Treeee');
        expect(updateUser.email).toBe('johntre@exemple.com');
    });

    it('should not be able update the profile from non-existing user', async () => {
        expect(
            updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: 'Test',
                email: 'test@exemplo.com.br',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@exemple.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'teste@exemple.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'john.doe@exemple.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@exemple.com',
            password: '123456',
        });

        const updateUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Treeee',
            email: 'johntre@exemple.com',
            old_password: '123456',
            password: '123123',
        });
        expect(updateUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@exemple.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Treeee',
                email: 'johntre@exemple.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@exemple.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Treeee',
                email: 'johntre@exemple.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
