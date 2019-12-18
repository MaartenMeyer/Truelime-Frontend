import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardsRoutingModule } from './boards-routing.module';
import { NewBoardComponent } from './new-board/new-board.component';
import { MyBoardsComponent } from './my-boards/my-boards.component';
import { BoardsComponent } from './boards.component';
import { BoardComponent } from './board/board.component';
import { ButtonsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaneComponent } from './board/lane/lane.component';
import { CardComponent } from './board/lane/card/card.component';
import { CategoryModalComponent } from './board/modals/category-modal/category-modal.component';

@NgModule({
  declarations: [
    NewBoardComponent,
    MyBoardsComponent,
    BoardsComponent,
    BoardComponent,
    LaneComponent,
    CardComponent,
    CategoryModalComponent
  ],
  imports: [
    DragDropModule,
    CommonModule,
    BoardsRoutingModule,
    ButtonsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BoardsModule {}
