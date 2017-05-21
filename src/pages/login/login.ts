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
    email: '',
    password: ''
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
    //let loading = this.loadingCtrl.create({
    //  content: 'Please wait...'
    //});
    //loading.present();

    this.auth.loginWithEmail(this.form).subscribe(data => {
      //if (loading) {
      //  loading.dismiss();
      //}
    }, err => {
      setTimeout(() => {
        //if (loading) {
        //  loading.dismiss();
        //}
        this.LoginError(err);
      }, 1000);
    });
  }

  LoginError(error) {
    if (error.code === 'auth/invalid-email') {
      this.loginErrorString = "Email Address wasn't valid.";
    } else if (error.code === 'auth/wrong-password') {
      this.loginErrorString = "Wrong password.";
    } else if (error.code === 'auth/user-not-found') {
      this.loginErrorString = "That user wasn't found";
    } else if (error.code === 'auth/user-disabled') {
      this.loginErrorString = "That user has been disabled";
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
