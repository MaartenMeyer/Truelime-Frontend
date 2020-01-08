import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { BoardService } from '@app/services/board.service';
import { first } from 'rxjs/operators';
import { Card } from '@app/models/card';

@Component({
  selector: 'app-colorpicker-modal',
  templateUrl: './colorpicker-modal.component.html',
  styleUrls: ['./colorpicker-modal.component.css']
})
export class ColorpickerModalComponent implements OnInit {
  public colors: string[] = [];
  content: any;
  selectedColor = '';
  card: Card;

  constructor(
    public mdbModalRef: MDBModalRef,
    private boardService: BoardService,
  ) { }

  ngOnInit() {
    this.colors = this.content.colors;
    this.card = this.content.card;
    this.selectedColor = this.content.card.color;
  }

  toggleColor(color: string) {
    this.selectedColor = color;
    this.card.color = this.selectedColor;
    this.boardService.updateCard(this.content.boardId, this.content.laneId, this.content.card.id, this.card)
      .pipe(first()).subscribe(data => {
      this.mdbModalRef.hide();
    });
  }

  getId(color: string) {
    if (this.selectedColor === color) {
      return 'selected';
    } else {
      return 'color';
    }
  }
}
