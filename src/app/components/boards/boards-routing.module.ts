import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MyBoardsComponent} from './my-boards/my-boards.component';
import {NewBoardComponent} from './new-board/new-board.component';
import {BoardsComponent} from './boards.component';


const routes: Routes = [
  { path: 'boards', component: BoardsComponent, children: [
    { path: 'myboards', component: MyBoardsComponent },
    { path: 'newboard', component: NewBoardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
