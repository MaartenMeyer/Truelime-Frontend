import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MyBoardsComponent} from './components/boards/my-boards/my-boards.component';
import {NewBoardComponent} from './components/boards/new-board/new-board.component';
import {SettingsComponent} from './components/settings/settings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myboards', component: MyBoardsComponent },
  { path: 'newboard', component: NewBoardComponent },
  { path: 'settings', component: SettingsComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
