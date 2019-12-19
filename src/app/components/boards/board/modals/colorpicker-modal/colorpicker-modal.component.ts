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
  public colors: string[] = [
    '#8bd201',
    '#ed5603',
    '#31D4E8',
    // '#2B7EEB',
    '#E8B841',
    '#E84438',
    '#FFFF00',
    '#FF00FF',
    '#808080',
    '#f7f7f7',
  ];
  content: any;
  selectedColor = '';
  card: Card;

  constructor(
    public mdbModalRef: MDBModalRef,
    private boardService: BoardService,
  ) { }

  ngOnInit() {
    this.card = this.content.card;
    this.selectedColor = this.content.card.color;
  }

  toggleColor(color: string) {
    this.selectedColor = color;
  }

  getId(color: string) {
    if (this.selectedColor === color) {
      return 'selected';
    } else {
      return 'color';
    }
  }

  changeColor() {
    this.card.color = this.selectedColor;
    this.boardService.updateCard(this.content.boardId, this.content.laneId, this.content.card.id, this.card)
      .pipe(first()).subscribe(data => {
        this.mdbModalRef.hide();
    });
  }
}
