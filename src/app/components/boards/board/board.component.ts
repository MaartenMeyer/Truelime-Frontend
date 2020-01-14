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
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { SignalRService } from 'src/app/services/signalr.service';
import { Subscription } from 'rxjs';
import { LaneModalComponent } from './modals/lane-modal/lane-modal.component';
import { BoardModalComponent } from './modals/board-modal/board-modal.component';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  mdbModalRef: MDBModalRef;
  board: Board;
  currentUser: User;
  private signalRSubscription: Subscription;

  constructor(
    private boardService: BoardService,
    private mdbModalService: MDBModalService,
    private router: Router,
    private route: ActivatedRoute,
    private signalrService: SignalRService,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone,
    private authenticationService: AuthService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
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

  isAuthorized(): boolean {
    return this.currentUser === null ? false : this.currentUser.id === this.board.owner.id;
  }

  loadBoard() {
    this.boardService
      .getBoardById(this.board.id)
      .pipe(first())
      .subscribe(board => {
        this.zone.run(() => {
          if (board === null) {
            this.router.navigate(['/dashboard']);
          } else {
            this.board = board;
            this.changeDetector.markForCheck();
          }
        });
      });
  }

  openBoardModal() {
    this.openModal(BoardModalComponent, {
      data: {
        content: {
          board: this.board
        },
      },
    });
  }

  openLaneModal() {
    this.openModal(LaneModalComponent, {
      data: { content: { boardId: this.board.id } },
    });
  }

  private openModal(component: any, modalOptions: any) {
    this.mdbModalRef = this.mdbModalService.show(component, modalOptions);
  }

  clearBoard() {
    if (confirm(`Weet u zeker dat u alle kaarten van ${this.board.title} wilt verwijderen?`)) {
      this.boardService
        .deleteAllCards(this.board.id)
        .pipe(first())
        .subscribe(data => {});
    }
  }
}
