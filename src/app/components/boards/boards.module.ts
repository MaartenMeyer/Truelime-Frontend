import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { BoardsRoutingModule } from './boards-routing.module';
import {NewBoardComponent} from './new-board/new-board.component';
import {MyBoardsComponent} from './my-boards/my-boards.component';
import {BoardsComponent} from './boards.component';
import { BoardComponent } from './board/board.component';
import {ButtonsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    NewBoardComponent,
    MyBoardsComponent,
    BoardsComponent,
    BoardComponent,
  ],
    imports: [
        DragDropModule,
        CommonModule,
        BoardsRoutingModule,
        ButtonsModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ]
})
export class BoardsModule { }
