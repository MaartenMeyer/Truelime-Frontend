import { Component, OnInit } from '@angular/core';
import {Board} from '../../../models/board';
import {BoardService} from '../../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  board: Board;
  id: string;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute
    ) {

  }

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

    connection.start().then(function () {
      console.log('SignalR connected.');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", () => {
      this.loadBoard();
    });
  }

  loadBoard() {
    this.boardService.getBoardById(this.id)
      .pipe(first())
      .subscribe(board => {
        this.board = board;
      })
  }

}
