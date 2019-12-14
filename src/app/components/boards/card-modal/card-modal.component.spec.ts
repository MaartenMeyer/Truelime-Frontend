import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModalComponent } from './card-modal.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';

describe('CardModalComponent', () => {
  let component: CardModalComponent;
  let fixture: ComponentFixture<CardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      declarations: [ CardModalComponent ],
      providers: [MDBModalService, MDBModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
