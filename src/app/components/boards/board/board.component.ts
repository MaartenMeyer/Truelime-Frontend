import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import {Board} from '../../../models/board';
import {BoardService} from '../../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';
import {CardModalComponent} from './modals/card-modal/card-modal.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';
import { LaneModalComponent } from './modals/lane-modal/lane-modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
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
    this.signalRSubscription = this.signalrService.getMessage().subscribe(
      (message) => {
        this.loadBoard();
      }
    )
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
    this.boardService.getBoardById(this.board.id)
      .pipe(first())
      .subscribe(board => {
        this.zone.run(() => {
          this.board = board;
          this.changeDetector.markForCheck();
        })
      });
  }

  openLaneModal(boardId: string) {
    this.openModal(LaneModalComponent, { data: { content: { boardId } }});
  }

  openCardModal(boardId: string, laneId: string) {
    this.openModal(CardModalComponent, { data: { content: { boardId, laneId } }});
  }

  private openModal(component: any, modalOptions: any) {
    this.mdbModalRef = this.mdbModalService.show(component, modalOptions);
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
        .subscribe(data => {
        });
    }
  }

  deleteCard(laneId: string, cardId: string) {
    const boardid = this.board.id;
    const laneid = laneId;
    const cardid = cardId;

    this.boardService.deleteCard(boardid, laneid, cardid)
      .pipe(first())
      .subscribe(data => {
      });
  }
}
