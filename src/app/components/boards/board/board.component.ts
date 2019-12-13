import { Component, OnInit } from '@angular/core';
import {Board} from '../../../models/board';
import {BoardService} from '../../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {CardModalComponent} from '../card-modal/card-modal.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Lane} from '../../../models/lane';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  mdbModalRef: MDBModalRef;
  board: Board;
  id: string;
  private boards: object;

  constructor(
    private boardService: BoardService,
    private mdbModalService: MDBModalService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.board.error) {

      } else {
        this.board = data.board;
        this.id = data.board.id;
      }
    });

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(`${environment.baseUrl}/notify`)
      .build();

    connection.start().then(function() {
      console.log('SignalR connected.');
    }).catch(function(err) {
      return console.error(err.toString());
    });

    connection.on('BroadcastMessage', () => {
      this.loadBoard();
    });
  }

  loadBoard() {
    this.boardService.getBoardById(this.id)
      .pipe(first())
      .subscribe(board => {
        this.board = board;
      });
  }

  openCardModal(boardId: string, laneId: string) {
    console.log(boardId)
    const modalOptions = {
      data: {
        content: { boardId, laneId}
      }
    };
    this.mdbModalRef = this.mdbModalService.show(CardModalComponent,  modalOptions );
  }

  //IN PROGRESS
  //Change Title of Lane on detect change
  //Add (change)="onLaneTitleChange()" to Lane input in board.component.html
  // onLaneTitleChange(boardId: string, laneId: string, lane: Lane){
  //   this.boardService.updateLane(boardId, laneId, lane)
  // }

  clearBoard(id: string, board: Board) {
    if (confirm(`Weet u zeker dat u alle kaarten van ${board.title} wilt verwijderen?`)) {
      this.boardService.deleteAllCards(id)
        .pipe(first())
        .subscribe(
          data => {
            return;
          }
        );
    }
  }

  deleteCard(laneId: string, cardId: string) {
    console.log('DELETE CARD');
    const boardid = this.id;
    const laneid = laneId;
    const cardid = cardId;

    this.boardService.deleteCard(boardid, laneid, cardid)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
      });
  }
}
