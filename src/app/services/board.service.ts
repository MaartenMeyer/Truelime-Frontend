import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Board} from '@app/models/board';
import {Card} from '@app/models/card';
import {Lane} from '@app/models/lane';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) {}

  /** Board Requests  */
  // Create new board
  createBoard(board: Board) {
    return this.http.post<Board>(`${environment.baseUrl}/boards`, board);
  }

  // Get all boards
  getBoards() {
    return this.http.get<Board[]>(`${environment.baseUrl}/boards`);
  }

  // Get board by id
  getBoardById(id: string) {
    return this.http.get<Board>(`${environment.baseUrl}/boards/${id}`);
  }

  // Update board by id
  updateBoard(id: string, board: Board) {
    return this.http.put<Board>(`${environment.baseUrl}/boards/${id}`, board);
  }

  // Delete board by id
  deleteBoard(id: string) {
    return this.http.delete(`${environment.baseUrl}/boards/${id}`);
  }

  /** Lane Requests */
  // Create lane
  createLane(boardId: string, lane: Lane) {
    return this.http.post<Lane>(`${environment.baseUrl}/boards/${boardId}/lanes`, lane);
  }

  // Update lane
  updateLane(boardId: string, laneId: string, lane: Lane) {
    return this.http.put<Lane>(`${environment.baseUrl}/boards/${boardId}/lanes/${laneId}`, lane);
  }

  // Delete lane
  deleteLane(boardId: string, laneId: string) {
    return this.http.delete(`${environment.baseUrl}/boards/${boardId}/lanes/${laneId}`);
  }

  /** Card Requests */
  // Create card
  createCard(boardId: string, laneId: string, card: Card) {
    return this.http.post<Card>(`${environment.baseUrl}/boards/${boardId}/lanes/${laneId}/cards`, card);
  }

  // Update card
  updateCard(boardId: string, laneId: string, cardId: string, card: Card) {
    return this.http.put<Card>(`${environment.baseUrl}/boards/${boardId}/lanes/${laneId}/cards/${cardId}`, card);
  }

  // Delete card
  deleteCard(boardId: string, laneId: string, cardId: string) {
    return this.http.delete(`${environment.baseUrl}/boards/${boardId}/lanes/${laneId}/cards/${cardId}`);
  }

  // Delete all cards
  deleteAllCards(boardId: string) {
    return this.http.delete(`${environment.baseUrl}/boards/${boardId}/cards`);
  }
}
