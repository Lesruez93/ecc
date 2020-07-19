import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {UsersRoutes} from './users.routing';
import {UsersComponent} from './users.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    FormsModule,
    MaterialModule,



  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
