import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteUserService: DeleteUserService;

describe('Delete User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteUserService = new DeleteUserService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete user', async () => {
    await expect(
      deleteUserService.execute({ email: 'fulano@gmail.com' }),
    ).toBeTruthy();
  });
});
