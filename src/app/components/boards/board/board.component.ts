import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import {Board} from '../../../models/board';
import {BoardService} from '../../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';
import {CardModalComponent} from '../card-modal/card-modal.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  mdbModalRef: MDBModalRef;
  board: Board;
  id: string;
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
      if (data.board.error) {

      } else {
        this.board = data.board;
        this.id = data.board.id;
        console.log(this.board)
      }
    });
  }

  ngOnDestroy(): void {
    this.signalRSubscription.unsubscribe();
  }

  loadBoard() {
    this.boardService.getBoardById(this.id)
      .pipe(first())
      .subscribe(board => {
        // Realtime update fix
        this.zone.run(() => {
          this.board = board;
          this.changeDetector.markForCheck();
        })
      });
  }

  openCardModal(boardId: string, laneId: string) {
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
        .subscribe(data => {
        });
    }
  }

  deleteCard(laneId: string, cardId: string) {
    const boardid = this.id;
    const laneid = laneId;
    const cardid = cardId;

    this.boardService.deleteCard(boardid, laneid, cardid)
      .pipe(first())
      .subscribe(data => {
      });
  }
}
