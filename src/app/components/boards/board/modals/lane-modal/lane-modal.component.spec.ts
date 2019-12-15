import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneModalComponent } from './lane-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';

describe('LaneModalComponent', () => {
  let component: LaneModalComponent;
  let fixture: ComponentFixture<LaneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ LaneModalComponent ],
      providers: [MDBModalService, MDBModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
