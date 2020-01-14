import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardComponent } from './new-board.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('NewBoardComponent', () => {
  let component: NewBoardComponent;
  let fixture: ComponentFixture<NewBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      declarations: [ NewBoardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call the method submitBoard', () => {
    spyOn(component, 'submitBoard')
    component.submitBoard()
    expect(component.submitBoard).toHaveBeenCalled()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
