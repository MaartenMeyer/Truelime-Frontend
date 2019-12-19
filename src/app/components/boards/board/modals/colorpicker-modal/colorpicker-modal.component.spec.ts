import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpickerModalComponent } from './colorpicker-modal.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Card } from '@app/models/card';

describe('ColorpickerModalComponent', () => {
  let component: ColorpickerModalComponent;
  let fixture: ComponentFixture<ColorpickerModalComponent>;
  const card: Card = {
    id: 'card-1',
    title: 'Card 1',
    message: 'Message',
    author: null,
    rating: 1,
    color: '#999999',
    type: 'card'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ColorpickerModalComponent ],
      providers: [MDBModalService, MDBModalRef ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorpickerModalComponent);
    component = fixture.componentInstance;
    component.content = { card };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
