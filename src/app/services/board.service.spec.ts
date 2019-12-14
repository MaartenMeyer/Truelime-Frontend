import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [BoardService]
  }));

  it('should be created', () => {
    const service: BoardService = TestBed.get(BoardService);
    expect(service).toBeTruthy();
  });
});
