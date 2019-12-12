import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule],
    providers: [BoardService]
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    const service: BoardService = TestBed.get(BoardService);
    expect(service).toBeTruthy();
  });
});
