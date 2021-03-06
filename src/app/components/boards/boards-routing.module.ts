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
    { path: '', redirectTo: 'myboards', pathMatch: 'full' },
    { path: 'myboards', component: MyBoardsComponent, canActivate: [AuthGuard] },
    { path: 'newboard', component: NewBoardComponent, canActivate: [AuthGuard] },
    { path: 'board/:id', component: BoardComponent, resolve: { board: BoardResolver }},
    { path: '**', redirectTo: 'myboards' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BoardResolver]
})
export class BoardsRoutingModule { }
