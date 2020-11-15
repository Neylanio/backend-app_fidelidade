import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('Authentication', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@gmail.com',
      username: 'teste',
      password: 'password',
      avatar: '',
      type: 'employee',
      type_employee: '',
      surname: 'teste completo',
      whatsapp: '889955566',
      active: '1',
    });

    const response = await authenticateUserService.execute({
      login: 'teste',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong login', async () => {
    await fakeUsersRepository.create({
      email: 'teste@gmail.com',
      username: 'teste',
      password: 'password',
      avatar: '',
      type: 'employee',
      type_employee: '',
      surname: 'teste completo',
      whatsapp: '889955566',
      active: '1',
    });

    await expect(
      authenticateUserService.execute({
        login: 'teste12',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      email: 'teste@gmail.com',
      username: 'teste',
      password: 'password',
      avatar: '',
      type: 'employee',
      type_employee: '',
      surname: 'teste completo',
      whatsapp: '889955566',
      active: '1',
    });

    await expect(
      authenticateUserService.execute({
        login: 'teste',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        login: 'teste',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
