import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '@app/services/board.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-lane-modal',
  templateUrl: './lane-modal.component.html',
  styleUrls: ['./lane-modal.component.css']
})
export class LaneModalComponent implements OnInit {
  content: any;
  laneForm: FormGroup;
  submitted = false;

  constructor(
    public mdbModalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private boardService: BoardService,
  ) { }

  ngOnInit() {
    this.laneForm = this.formBuilder.group({
      title: ['', [Validators.required]]
    });
  }

  get form() {
    return this.laneForm.controls;
  }

  submitLane(boardId: string) {
    this.submitted = true;
    if (this.laneForm.invalid) {
      return;
    }
    this.boardService.createLane(boardId, this.laneForm.value)
      .pipe(first()).subscribe(data => {
        this.mdbModalRef.hide();
      })
  }

}
