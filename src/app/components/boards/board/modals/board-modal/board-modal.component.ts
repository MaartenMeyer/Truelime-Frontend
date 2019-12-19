import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BoardService } from '@app/services/board.service';
import { first } from 'rxjs/operators';
import { Board } from '@app/models/board';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.css'],
})
export class BoardModalComponent implements OnInit {
  content: any;
  boardForm: FormGroup;
  submitted = false;
  colors: string[] = ['#FCFF33', '#F00101', '#1BF001', '#999999', '#123456'];
  selectedColors: string[] = [];

  constructor(
    public mdbModalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      title: [this.content.board.title, [Validators.required]],
      description: [this.content.board.description, [Validators.required]],
      colors: []
    });
    this.content.board.colors.forEach(element => {
      this.selectedColors.push(element)
    });;
  }

  get form() {
    return this.boardForm.controls;
  }

  toggleColor(color: string) {
    if (this.selectedColors.includes(color)) {
      this.selectedColors.splice(this.selectedColors.indexOf(color), 1 );
    } else {
      this.selectedColors.push(color);
    }
  }

  getId(color: string) {
    if (this.selectedColors.includes(color)) {
      return 'selected';
    } else {
      return 'color';
    }
  }

  updateBoard() {
    this.submitted = true;
    if (this.boardForm.invalid) {
      return;
    }
    this.boardForm.value.colors = this.selectedColors;
    this.boardService
      .updateBoard(this.content.board.id, this.boardForm.value)
      .pipe(first())
      .subscribe(data => {
        this.mdbModalRef.hide();
      });
  }
}
