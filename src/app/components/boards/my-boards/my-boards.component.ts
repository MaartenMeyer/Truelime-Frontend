import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../../services/board.service';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css'],
  providers: [BoardService]
})
export class MyBoardsComponent implements OnInit {
  public boards: object;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.getMyBoards();
  }

  getMyBoards(): void {
    this.boardService.getBoards().subscribe(result => (this.boards = result));
  }
}
