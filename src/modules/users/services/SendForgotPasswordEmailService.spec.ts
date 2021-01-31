import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailSerive from './SendForgotPasswordEmailService';

// para nao ficar repetitivo usando em todos
let fakeUsersRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailSerive;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailSerive(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemplo.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@exemplo.com',
        });
        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
        // const fakeUsersRepository = new FakeUserRepository();
        // const fakeMailProvider = new FakeMailProvider();

        // const sendForgotPasswordEmail = new SendForgotPasswordEmailSerive(
        //     fakeUsersRepository,
        //     fakeMailProvider,
        // );

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@exemplo.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        // const fakeUsersRepository = new FakeUserRepository();
        // const fakeMailProvider = new FakeMailProvider();
        // const fakeUserTokensRepository = new FakeUserTokensRepository();

        // const sendForgotPasswordEmail = new SendForgotPasswordEmailSerive(
        //     fakeUsersRepository,
        //     fakeMailProvider,
        //     );
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemplo.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@exemplo.com',
        });
        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
