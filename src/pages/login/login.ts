import { Component } from '@angular/core';
import { MenuController, AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';

import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../../pages/pages';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  form: {email: string, password: string} = {
    email: 'test@example.com',
    password: 'demo1234'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(
      private navCtrl: NavController,
      private auth: AuthProvider,
      private menu: MenuController,
      private loadingCtrl: LoadingController,
      private alertController: AlertController,
      private toastCtrl: ToastController) {

  }

  openSignupPage(): void {
    this.navCtrl.push(SignupPage);
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.loginWithEmail(this.form).subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        // The auth subscribe method inside the app.component.ts will handle the page switch to home
        this.menu.enable(true);
        this.navCtrl.setRoot(MainPage);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.LoginError(err);
      }, 1000);
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
