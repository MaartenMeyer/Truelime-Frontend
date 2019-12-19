import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { BoardService } from '@app/services/board.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from '@app/models/board';
import { Lane } from '@app/models/lane';
import { Card } from '@app/models/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const board: Board = {
    id: '1',
    title: 'Title',
    description: 'Description',
    owner: null,
    participants: null,
    lanes: null,
    colors: ['#999999']
  };
  const lane: Lane = {
    id: '1',
    title: 'Title',
    cards: null
  };
  const card: Card = {
    id: '1',
    title: 'Title',
    message: 'Message',
    author: null,
    rating: null,
    color: 'color'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule, DragDropModule,  MDBBootstrapModule.forRoot() ],
      declarations: [ CardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ BoardService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.board = board;
    component.lane = lane;
    component.card = card;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
