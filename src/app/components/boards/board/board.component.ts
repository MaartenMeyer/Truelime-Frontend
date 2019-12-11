import { Component, OnInit } from '@angular/core';
import {Board} from '../../../models/board';
import {BoardService} from '../../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  id: string;
  board: Board;

  constructor(private boardService: BoardService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.id = paramsId.id;

      this.boardService.getBoardById(this.id).subscribe(
        (board) => {
          this.board = board;
        });
    });
  }

}
