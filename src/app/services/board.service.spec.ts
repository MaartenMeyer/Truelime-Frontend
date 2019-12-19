import { TestBed } from '@angular/core/testing';

import { BoardService } from './board.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Board } from '@app/models/board';
import { Card } from '@app/models/card';
import { Lane } from '@app/models/lane';

import { environment } from '@environments/environment';

describe('BoardService', () => {
  let boardService: BoardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [BoardService]
    });
    boardService = TestBed.get(BoardService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(boardService).toBeTruthy();
  });

  describe('boards', () => {
    const card1: Card = {
      id: 'card-1',
      title: 'Card 1',
      message: 'Message',
      author: null,
      rating: 1,
      color: 'Color',
      type: 'card'
    };
    const card2: Card = {
      id: 'card-2',
      title: 'Card 2',
      message: 'Message',
      author: null,
      rating: 2,
      color: 'Color',
      type: 'card'
    };

    const lane: Lane = {
      id: 'lane-1',
      title: 'Lane 1',
      cards: [null]
    };
    lane.cards.push(card1, card2);

    const board: Board = {
      id: 'board-1',
      title: 'Board 1',
      description: 'Description',
      lanes: [lane],
      owner: null,
      participants: null,
      colors: ['#999999']
    };

    it('createBoard() should create board', () => {
      boardService.createBoard(board).subscribe(data => {
        expect(data.id).toEqual(board.id);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards`);
      expect(req.request.method).toBe('POST');
      req.flush(board);
    });

    it('getBoards() should return boards', () => {
      const boards: Board[] = [board];
      boardService.getBoards().subscribe(data => {
        expect(data.length).toBe(1);
        expect(data[0].id).toEqual(board.id);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards`);
      expect(req.request.method).toBe('GET');
      req.flush(boards);
    });

    it('getBoardById() should return board', () => {
      boardService.getBoardById(board.id).subscribe(data => {
        expect(data.id).toEqual(board.id);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards/${board.id}`);
      expect(req.request.method).toBe('GET');
      req.flush(board);
    });

    it('updateBoard() should update board', () => {
      boardService.updateBoard(board.id, board).subscribe(data => {
        expect(data.id).toEqual(board.id);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards/${board.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(board);
    });

    it('deleteBoard() should delete board', () => {
      boardService.deleteBoard(board.id).subscribe((data: any) => {
        expect(data.message).toBe(`Board deleted`);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards/${board.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({
        message: `Board deleted`
      });
    });

    it('createLane() should create lane', () => {
      boardService.createLane(board.id, lane).subscribe(data => {
        expect(data.id).toEqual(lane.id);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards/${board.id}/lanes`);
      expect(req.request.method).toBe('POST');
      req.flush(lane);
    });

    it('updateLane() should update lane', () => {
      boardService.updateLane(board.id, lane.id, lane).subscribe(data => {
        expect(data.id).toEqual(lane.id);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards/${board.id}/lanes/${lane.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(lane);
    });

    it('deleteLane() should delete lane', () => {
      boardService.deleteLane(board.id, lane.id).subscribe((data: any) => {
        expect(data.message).toBe(`Lane deleted`);
      });
      const req = httpMock.expectOne(`${environment.baseUrl}/boards/${board.id}/lanes/${lane.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({
        message: `Lane deleted`
      });
    });
  });
});
