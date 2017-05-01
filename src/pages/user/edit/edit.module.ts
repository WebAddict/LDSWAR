import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEditPage } from './edit';

@NgModule({
  declarations: [
    UserEditPage,
  ],
  imports: [
    IonicPageModule.forChild(UserEditPage),
  ],
  exports: [
    UserEditPage
  ]
})
export class UserEditModule {}
