import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _auth: AuthService) {

  }

  addItem(){
  }
 
  viewItem(){
 
  }
  ionViewDidLoad(){
 
  }
  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
  }
}
