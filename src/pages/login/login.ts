import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {email: string, password: string} = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public auth: AuthService,
              public toastCtrl: ToastController) {

  }

  // Attempt to login in through our User service
  doLogin() {
    this.auth.signInWithEmail(this.account).then(() => {
      this.navCtrl.setRoot(MainPage, {}, {animate: true, direction: 'forward'});
    }).catch((error) => {
      // If there's an error, dismiss loading control and display error message
      //this.auth.LoadingControllerDismiss();
      this.LoginError(error);
      // Unable to log in
      //let toast = this.toastCtrl.create({
      //  message: this.loginErrorString,
      //  duration: 3000,
      //  position: 'top'
      //});
      //toast.present();
    });
  }

  LoginError(error) {
    if (error.code === 'auth/wrong-password') {
      this.loginErrorString = "Wrong password.";
    } else {
      this.loginErrorString = error.message;
    }
    let alert = this.alertController.create({
      title: this.loginErrorString,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //do handler stuff here
          }
        }
      ]
    });
    alert.present();
  }

}
