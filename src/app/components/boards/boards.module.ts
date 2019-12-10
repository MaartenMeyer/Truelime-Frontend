import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { BoardsRoutingModule } from './boards-routing.module';
import {NewBoardComponent} from './new-board/new-board.component';
import {MyBoardsComponent} from './my-boards/my-boards.component';
import {BoardsComponent} from './boards.component';


@NgModule({
  declarations: [
    NewBoardComponent,
    MyBoardsComponent,
    BoardsComponent,
  ],
  imports: [
    DragDropModule,
    CommonModule,
    BoardsRoutingModule
  ]
})
export class BoardsModule { }
