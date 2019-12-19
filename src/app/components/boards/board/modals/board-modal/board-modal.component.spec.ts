import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModalComponent } from './board-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Board } from '@app/models/board';

describe('BoardModalComponent', () => {
  let component: BoardModalComponent;
  let fixture: ComponentFixture<BoardModalComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const board: Board = {
    id: '1',
    title: 'Title',
    description: 'Description',
    owner: null,
    participants: null,
    lanes: null,
    colors: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [BoardModalComponent],
      providers: [MDBModalService, MDBModalRef],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardModalComponent);
    component = fixture.componentInstance;
    component.content = { board };
    component.boardForm = formBuilder.group({
      title: [board.title, [Validators.required]],
      description: [board.description, [Validators.required]],
      colors: [board.colors]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
