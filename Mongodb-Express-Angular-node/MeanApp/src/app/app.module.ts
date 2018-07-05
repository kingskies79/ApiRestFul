import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { DataService} from './data.service';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const appRoutes: Routes = [
  {path: 'users/user_edit/:id', component: EditUserComponent},
  {path: 'users', component: UserComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'}
];



@NgModule({

  declarations: [
    AppComponent,
    UserComponent,
    EditUserComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
