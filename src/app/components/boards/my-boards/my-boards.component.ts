import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../../services/board.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {error} from 'util';
import {Board} from '../../../models/board';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css'],
  providers: [BoardService]
})
export class MyBoardsComponent implements OnInit {
  boards: Board[] = [];
  loading = false;

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.getMyBoards();
  }

  getMyBoards(): void {
    this.boardService.getBoards()
      .subscribe(result => {
        this.loading = false;
        this.boards = result;
      });
  }

  deleteBoard(id: string, board: Board) {
    if (confirm(`Weet u zeker dat u ${board.title} wilt verwijderen?`)) {
      this.boardService.deleteBoard(id)
        .pipe(first())
        .subscribe(
          response => {
            this.loading = true;
            this.getMyBoards();
          }
        );
    }
  }
}
