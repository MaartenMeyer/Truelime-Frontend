import { Component, OnInit, Input } from '@angular/core';
import { Board } from '@app/models/board';
import { Lane } from '@app/models/lane';
import { BoardService } from '@app/services/board.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { first } from 'rxjs/operators';
import { Card } from '@app/models/card';
import { ColorpickerModalComponent } from '../../modals/colorpicker-modal/colorpicker-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() board: Board;
  @Input() lane: Lane;
  @Input() card: Card;
  mdbModalRef: MDBModalRef;

  constructor(
    private boardService: BoardService,
    private mdbModalService: MDBModalService,
  ) { }

  ngOnInit() {
  }

  openColorModal() {
    this.openModal(ColorpickerModalComponent, {
      data: { content: { boardId: this.board.id, laneId: this.lane.id, card: this.card } },
    });
  }

  private openModal(component: any, modalOptions: any) {
    this.mdbModalRef = this.mdbModalService.show(component, modalOptions);
  }

  deleteCard(laneId: string, cardId: string) {
    if (confirm(`Weet u zeker dat u dit kaartje wilt verwijderen?`)) {
      this.boardService
      .deleteCard(this.board.id, laneId, cardId)
      .pipe(first())
      .subscribe(data => {});
    }
  }

  updateCard(laneId: string, cardId: string, card: Card) {
    this.boardService
      .updateCard(this.board.id, laneId, cardId, card)
      .pipe(first())
      .subscribe(data => {});
  }

}
