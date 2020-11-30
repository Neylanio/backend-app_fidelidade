import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateEmployeeService from './CreateEmployeeService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createEmployeeService: CreateEmployeeService;

describe('Create Employee', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createEmployeeService = new CreateEmployeeService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create employee', async () => {
    const employee = await createEmployeeService.execute({
      email: 'fulano@gmail.com',
      username: 'fulano',
      password: 'password-123',
      avatar: '',
      surname: 'fulano gomes soares',
      whatsapp: '88999564512',
      type_employee: 'manager',
    });

    expect(employee.id).toBeTruthy();
  });

  it('should not be able to create employee with email already registered', async () => {
    await createEmployeeService.execute({
      email: 'fulano@gmail.com',
      username: 'fulano',
      password: 'password-123',
      avatar: '',
      surname: 'fulano gomes soares',
      whatsapp: '88999564512',
      type_employee: 'manager',
    });

    await expect(
      createEmployeeService.execute({
        email: 'fulano@gmail.com',
        username: 'fulano2',
        password: 'password-123',
        avatar: '',
        surname: 'fulano soares',
        whatsapp: '88555564512',
        type_employee: 'manager',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create employee with username already registered', async () => {
    await createEmployeeService.execute({
      email: 'fulano@gmail.com',
      username: 'fulano',
      password: 'password-123',
      avatar: '',
      surname: 'fulano gomes soares',
      whatsapp: '88999564512',
      type_employee: 'manager',
    });

    await expect(
      createEmployeeService.execute({
        email: 'fulano2@gmail.com',
        username: 'fulano',
        password: 'password-123',
        avatar: '',
        surname: 'fulano soares',
        whatsapp: '88555564512',
        type_employee: 'manager',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create employee other than manager or ordinary', async () => {
    await expect(
      createEmployeeService.execute({
        email: 'fulano@gmail.com',
        username: 'fulano',
        password: 'password-123',
        avatar: '',
        surname: 'fulano soares',
        whatsapp: '88555564512',
        type_employee: 'other',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
