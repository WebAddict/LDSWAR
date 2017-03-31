import { Component } from '@angular/core';
import { MenuController, AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { LoginPage } from '../login/login';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public form: {firstName: string, lastName: string, email: string, password: string} = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@example.com',
    password: 'demo1234'
  };
  
  alertMessage: string;

  constructor(
      private navCtrl: NavController,
      private auth: AuthProvider,
      private menu: MenuController,
      private alertController: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController) {
  }

  openForgotPasswordPage(): void {
    this.navCtrl.push(ForgotPasswordPage);
  }

  openLoginPage(): void {
    this.navCtrl.push(LoginPage);
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.registerUser(this.form).subscribe(registerData => {
      this.auth.loginWithEmail(registerData).subscribe(loginData => {
        setTimeout(() => {
          loading.dismiss();
          this.menu.enable(true);
          this.navCtrl.setRoot(MainPage);
        }, 1000);
      }, loginError => {
        setTimeout(() => {
          loading.dismiss();
          this.SignUpError(loginError);
        }, 1000);
      });
    }, registerError => {
      setTimeout(() => {
        loading.dismiss();
        this.SignUpError(registerError);
      }, 1000);
    });
  }

  SignUpError(error): void {
    switch (error.code) {
      case "auth/email-already-in-use":
          this.alertMessage = "The specified email is already in use!"
          break;
      case "auth/invalid-email":
          this.alertMessage = "The specified email is not valid!"
          break;
      case "auth/operation-not-allowed":
          this.alertMessage = "Your account has been disabled. Please contact support!"
          break;
      case "auth/weak-password":
          this.alertMessage = "Password should be at least 6 characters!"
          break;
    }
    let alert = this.alertController.create({
      title: 'Sign Up Failed',
      subTitle: this.alertMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  presentModal() {
  }
}
