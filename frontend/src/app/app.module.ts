import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/page/header/header.component';
import { PageComponent } from './components/page/page.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';
import { BoardComponent } from './components/page/board/board.component';
import { BoardListComponent } from './components/page/dashboard/board-list/board-list.component';
import { ModalComponent } from './components/page/modal/modal.component';
import { BoardBlockComponent } from './components/page/board/board-block/board-block.component';
import { TaskComponent } from './components/page/board/board-block/task/task.component';
import { TaskButtonsComponent } from './components/page/board/board-block/task/task-buttons/task-buttons.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './components/page/registration/login/login.component';
import { BlueBackgroundDirective } from './directives/blue-background.directive';
import { getTitlePipe } from './pipes/getTitle.pipe';
import { setColorPipe } from './pipes/setColor.pipe'
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/page/spinner/spinner.component';
import { FooterComponent } from './components/page/footer/footer.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/auth/registration', pathMatch: 'full' },
  { path: 'auth/registration', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'board/:id', component: BoardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageComponent,
    DashboardComponent,
    BoardComponent,
    BoardListComponent,
    ModalComponent,
    BoardBlockComponent,
    TaskComponent,
    TaskButtonsComponent,
    LoginComponent,
    BlueBackgroundDirective,
    getTitlePipe,
    setColorPipe,
    SpinnerComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    DragDropModule,
    ReactiveFormsModule,
  ],
  providers: [
    HeaderComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
