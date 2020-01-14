import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BoardService} from './board.service';
import { User } from '@app/models/user';


import { environment } from '@environments/environment';

describe('UserService', () => {
  
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [UserService]
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('users', ()=> {
    const user1: User = {
      id: 'user-1',
      email: 'user2@email.com',
      username: 'user-1',
      password: 'password',
      token: null
    };

    const user2: User = {
      id: 'user-2',
      email: 'user2@email.com',
      username: 'user-2',
      password: 'password2',
      token: null
    };

    it('register user should register a user', ()=>{
      userService.register(user1).subscribe(data => {
        expect(data).toBeTruthy()
      })
      
      const req = httpMock.expectOne(`${environment.baseUrl}/users/register`)
      expect(req.request.method).toBe('POST')
      req.flush(user1)
    })

    it('getAll should return users', ()=>{
      const users: User[] = [user1, user2]
      userService.getAll().subscribe(data => {
        expect(data.length).toBe(2)
      })

      const req = httpMock.expectOne(`${environment.baseUrl}/users`);
      expect(req.request.method).toBe('GET')
      req.flush(users)
    })
  })



});
