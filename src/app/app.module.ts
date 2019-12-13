import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import {BoardsModule} from './components/boards/boards.module';
import {HttpClientModule} from '@angular/common/http';
import { CardModalComponent } from './components/boards/card-modal/card-modal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    CardModalComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    DragDropModule,
    BrowserModule,
    BoardsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [CardModalComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
