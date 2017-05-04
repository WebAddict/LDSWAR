import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserOrganizationPage } from './organization';

@NgModule({
  declarations: [
    UserOrganizationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserOrganizationPage),
  ],
  exports: [
    UserOrganizationPage
  ]
})
export class UserOrganizationModule {}
