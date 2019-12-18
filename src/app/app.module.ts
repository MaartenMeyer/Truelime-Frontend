import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BoardsModule } from './components/boards/boards.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { CardModalComponent } from './components/boards/board/modals/card-modal/card-modal.component';
import { LaneModalComponent } from './components/boards/board/modals/lane-modal/lane-modal.component';
import { BoardModalComponent } from './components/boards/board/modals/board-modal/board-modal.component';
import { CategoryModalComponent } from './components/boards/board/modals/category-modal/category-modal.component';
import { ColorpickerModalComponent } from './components/boards/board/modals/colorpicker-modal/colorpicker-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    CardModalComponent,
    LaneModalComponent,
    BoardModalComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    DragDropModule,
    BrowserModule,
    BoardsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  entryComponents: [
    CardModalComponent,
    LaneModalComponent,
    BoardModalComponent,
    CategoryModalComponent,
    ColorpickerModalComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
