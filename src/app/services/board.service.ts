import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Board} from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }


  /** Board Requests **/
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
    return this.http.get<Board>(`${environment.baseUrl}/board/${id}`);
  }

  // Update board by id
  updateBoard(id: string, board: Board) {
    return this.http.put<Board>(`${environment.baseUrl}/board/${id}`, board);
  }

  // Delete board by id
  deleteBoard(id: string) {
    return this.http.delete(`${environment.baseUrl}/board/${id}`);
  }

  /** Lane Requests **/
  // Create lane
  createLane() {

  }

  // Update lane
  updateLane() {

  }

  // Delete lane
  deleteLane() {

  }

  /** Card Requests **/
  // Create card
  createCard() {

  }

  // Update card
  updateCard() {

  }

  // Delete card
  deleteCard() {

  }

}
