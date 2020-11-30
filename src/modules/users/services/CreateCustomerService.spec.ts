import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createCustomerService: CreateCustomerService;

describe('Create Customer', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createCustomerService = new CreateCustomerService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create customer', async () => {
    const customer = await createCustomerService.execute({
      email: 'fulano@gmail.com',
      username: 'fulano',
      password: 'password-123',
      avatar: '',
      surname: 'fulano gomes soares',
      whatsapp: '88999564512',
    });

    expect(customer.id).toBeTruthy();
  });

  it('should not be able to create customer with email already registered', async () => {
    await createCustomerService.execute({
      email: 'fulano@gmail.com',
      username: 'fulano',
      password: 'password-123',
      avatar: '',
      surname: 'fulano gomes soares',
      whatsapp: '88999564512',
    });

    await expect(
      createCustomerService.execute({
        email: 'fulano@gmail.com',
        username: 'fulano2',
        password: 'password-123',
        avatar: '',
        surname: 'fulano soares',
        whatsapp: '88555564512',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create customer with username already registered', async () => {
    await createCustomerService.execute({
      email: 'fulano@gmail.com',
      username: 'fulano',
      password: 'password-123',
      avatar: '',
      surname: 'fulano gomes soares',
      whatsapp: '88999564512',
    });

    await expect(
      createCustomerService.execute({
        email: 'fulano2@gmail.com',
        username: 'fulano',
        password: 'password-123',
        avatar: '',
        surname: 'fulano soares',
        whatsapp: '88555564512',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
