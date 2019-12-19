import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneComponent } from './lane.component';
import { BoardService } from '@app/services/board.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from '@app/models/board';
import { Lane } from '@app/models/lane';

describe('LaneComponent', () => {
  let component: LaneComponent;
  let fixture: ComponentFixture<LaneComponent>;
  const lane: Lane = {
    id: '1',
    title: 'Title',
    cards: null
  };
  const board: Board = {
    id: '1',
    title: 'Title',
    description: 'Description',
    owner: null,
    participants: null,
    lanes: [lane],
    colors: ['#999999']
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule, DragDropModule,  MDBBootstrapModule.forRoot() ],
      declarations: [ LaneComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ BoardService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaneComponent);
    component = fixture.componentInstance;
    component.board = board;
    component.lane = lane;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
