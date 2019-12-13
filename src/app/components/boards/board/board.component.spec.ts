import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Board} from '../../../models/board';
import {User} from '../../../models/user';
import {Lane} from '../../../models/lane';
import {FormsModule} from '@angular/forms';
import {MDBBootstrapModule, MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {ComponentLoaderFactory} from 'angular-bootstrap-md/lib/free/utils/component-loader/component-loader.factory';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule, MDBBootstrapModule.forRoot()],
      declarations: [ BoardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MDBModalService ]
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
