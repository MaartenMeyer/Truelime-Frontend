import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { Board } from '../../../models/board';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CardModalComponent } from './modals/card-modal/card-modal.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';
import { LaneModalComponent } from './modals/lane-modal/lane-modal.component';
import { BoardModalComponent } from './modals/board-modal/board-modal.component';
import { Lane } from '@app/models/lane';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  mdbModalRef: MDBModalRef;
  board: Board;
  private signalRSubscription: Subscription;

  constructor(
    private boardService: BoardService,
    private mdbModalService: MDBModalService,
    private router: Router,
    private route: ActivatedRoute,
    private signalrService: SignalRService,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.signalRSubscription = this.signalrService
      .getMessage()
      .subscribe(message => {
        this.loadBoard();
      });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.board = data.board;
    });
  }

  ngOnDestroy(): void {
    this.signalRSubscription.unsubscribe();
  }

  loadBoard() {
    this.boardService
      .getBoardById(this.board.id)
      .pipe(first())
      .subscribe(board => {
        this.zone.run(() => {
          this.board = board;
          this.changeDetector.markForCheck();
        });
      });
  }

  openBoardModal() {
    this.openModal(BoardModalComponent, {
      data: {
        content: {
          boardId: this.board.id,
          title: this.board.title,
          description: this.board.description,
        },
      },
    });
  }

  openLaneModal() {
    this.openModal(LaneModalComponent, {
      data: { content: { boardId: this.board.id } },
    });
  }

  openCardModal(laneId: string) {
    this.openModal(CardModalComponent, {
      data: { content: { boardId: this.board.id, laneId } },
    });
  }

  private openModal(component: any, modalOptions: any) {
    this.mdbModalRef = this.mdbModalService.show(component, modalOptions);
  }

  onLaneTitleChange(laneId: string, lane: Lane){
    console.log(lane);
    this.boardService
    .updateLane(this.board.id, laneId, lane)
    .pipe(first())
    .subscribe(data => {});
  }

  clearBoard() {
    if (confirm(`Weet u zeker dat u alle kaarten van ${this.board.title} wilt verwijderen?`)) {
      this.boardService
        .deleteAllCards(this.board.id)
        .pipe(first())
        .subscribe(data => {});
    }
  }

  deleteLane(laneId: string) {
    if (confirm(`Weet u zeker dat u deze rij wilt verwijderen?`)) {
      this.boardService
        .deleteLane(this.board.id, laneId)
        .pipe(first())
        .subscribe(data => {});
    }
  }

  deleteCard(laneId: string, cardId: string) {
    this.boardService
      .deleteCard(this.board.id, laneId, cardId)
      .pipe(first())
      .subscribe(data => {});
  }
}
