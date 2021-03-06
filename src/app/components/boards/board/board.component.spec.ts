import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MDBBootstrapModule, MDBModalService} from 'angular-bootstrap-md';
import { SignalRService } from 'src/app/services/signalr.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule, DragDropModule, MDBBootstrapModule.forRoot()],
      declarations: [ BoardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MDBModalService, SignalRService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    // const board = new Board('1', new User('test@test.nl', 'Jan', 'test123'), 'Test', 'Test', ['Harry'], Lane['']);
    // component.board = board;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
