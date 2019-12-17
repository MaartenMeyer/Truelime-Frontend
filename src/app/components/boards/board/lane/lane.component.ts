import { Component, OnInit, Input } from '@angular/core';
import { Lane } from '@app/models/lane';
import { BoardService } from '@app/services/board.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { Board } from '@app/models/board';
import { first } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from '@app/models/card';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css'],
})
export class LaneComponent implements OnInit {
  @Input() board: Board;
  @Input() lane: Lane;
  mdbModalRef: MDBModalRef;

  constructor(
    private boardService: BoardService,
    private mdbModalService: MDBModalService,
  ) {}

  ngOnInit() {}

  openCardModal(laneId: string) {
    this.openModal(CardModalComponent, {
      data: { content: { boardId: this.board.id, laneId } },
    });
  }

  private openModal(component: any, modalOptions: any) {
    this.mdbModalRef = this.mdbModalService.show(component, modalOptions);
  }

  onLaneTitleChange(laneId: string, lane: Lane) {
    this.boardService
    .updateLane(this.board.id, laneId, lane)
    .pipe(first())
    .subscribe(data => {});
  }

  deleteLane(laneId: string) {
    if (confirm(`Weet u zeker dat u deze rij wilt verwijderen?`)) {
      this.boardService
        .deleteLane(this.board.id, laneId)
        .pipe(first())
        .subscribe(data => {});
    }
  }

  onDrop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.boardService
          .updateLane(this.board.id, this.lane.id, this.lane)
          .pipe(first())
          .subscribe(data => {});
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
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
