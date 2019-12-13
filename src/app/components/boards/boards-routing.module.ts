import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MyBoardsComponent} from './my-boards/my-boards.component';
import {NewBoardComponent} from './new-board/new-board.component';
import {BoardsComponent} from './boards.component';
import {BoardComponent} from './board/board.component';
import { BoardResolver } from 'src/app/services/board.resolver';
import {AuthGuard} from '../../guards/auth.guard';


const routes: Routes = [
  { path: 'boards', component: BoardsComponent, children: [
    { path: 'myboards', component: MyBoardsComponent },
    { path: 'newboard', component: NewBoardComponent },
    { path: 'board/:id', component: BoardComponent, resolve: { board: BoardResolver }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BoardResolver]
})
export class BoardsRoutingModule { }
