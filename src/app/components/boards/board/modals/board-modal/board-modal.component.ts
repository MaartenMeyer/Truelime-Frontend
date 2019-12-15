import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BoardService } from '@app/services/board.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.css'],
})
export class BoardModalComponent implements OnInit {
  content: any;
  boardForm: FormGroup;
  submitted = false;

  constructor(
    public mdbModalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      title: [this.content.title, [Validators.required]],
      description: [this.content.description, [Validators.required]],
    });
  }

  get form() {
    return this.boardForm.controls;
  }

  updateBoard() {
    this.submitted = true;
    if (this.boardForm.invalid) {
      return;
    }
    this.boardService
      .updateBoard(this.content.boardId, this.boardForm.value)
      .pipe(first())
      .subscribe(data => {
        this.mdbModalRef.hide();
      });
  }
}
