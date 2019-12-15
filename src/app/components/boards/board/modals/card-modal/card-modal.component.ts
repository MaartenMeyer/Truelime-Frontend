import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoardService} from '@app/services/board.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {
  content: any;
  cardForm: FormGroup;
  submitted = false;

  constructor(
    public mdbModalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private boardService: BoardService,
  ) { }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  get form() {
    return this.cardForm.controls;
  }

  submitCard(boardId: string, laneId: string) {
    this.submitted = true;

    if (this.cardForm.invalid) {
      alert('Card value is not correct!');
    }
    this.boardService.createCard(boardId, laneId, this.cardForm.value)
      .pipe(first()).subscribe(data => {
        this.mdbModalRef.hide();
      // alert('Card is created!');
    });
  }
}
