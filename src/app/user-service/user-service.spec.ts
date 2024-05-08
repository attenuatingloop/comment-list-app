import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    const users = service.getUsers();
    expect(users.length).toBeGreaterThan(0);

    expect(Array.isArray(service.getUsers())).toEqual(true);
  });
});