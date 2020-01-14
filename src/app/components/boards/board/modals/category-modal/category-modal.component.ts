import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BoardService} from '@app/services/board.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  content: any;
  categoryForm: FormGroup;
  submitted = false;

  constructor(
    public mdbModalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private boardService: BoardService,
  ) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      message: ['', [Validators.required]],
      type: ['category']
    });
  }

  get form() {
    return this.categoryForm.controls;
  }

  submitCategory(boardId: string, laneId: string) {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    this.boardService.createCard(boardId, laneId, this.categoryForm.value)
      .pipe(first()).subscribe(data => {
        this.mdbModalRef.hide();
    });
  }
}
