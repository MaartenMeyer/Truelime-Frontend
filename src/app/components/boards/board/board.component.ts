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
  board: Board;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute
    ) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if(data.board.error) {

      } else {
        this.board = data.board;
      }
    })
  }

}
