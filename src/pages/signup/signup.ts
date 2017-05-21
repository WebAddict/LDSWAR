import { Component } from '@angular/core';
import { MenuController, AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { LoginPage } from '../login/login';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { AuthProvider } from '../../providers/auth';
import { PointsProvider, ReportPoints } from '../../providers/points';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public form: {firstName: string, lastName: string, email: string, password: string, organization: string} = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organization: 'allenRanch'
  };
  public reportPoints: ReportPoints;
  
  alertMessage: string;

  constructor(
      private navCtrl: NavController,
      private auth: AuthProvider,
      public points: PointsProvider,
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
        this.reportPoints = new ReportPoints('registration');
        this.points.add(this.reportPoints).subscribe(key => {
          //let alert = this.alertController.create({
          //  title: 'Registraton Success!',
          //  message: "You have been rewarded your first 5 W.A.R. Points!",
          //  buttons: ['Ok']
          //});
          //alert.present();
          //setTimeout(() => {
          //  this.menu.enable(true);
          //  if (loading) {
          //    loading.dismiss();
          //  }
            //if (this.navCtrl) {
              //this.navCtrl.setRoot(MainPage);
            //}
          //}, 1000);
        }, err => {
          console.log(err)
        });
      }, loginError => {
        setTimeout(() => {
          //if (loading) {
          //  loading.dismiss();
          //}
          this.SignUpError(loginError);
        }, 1000);
      });
    }, registerError => {
      setTimeout(() => {
        //if (loading) {
        //  loading.dismiss();
        //}
        this.SignUpError(registerError);
      }, 1000);
    });
  }

  SignUpError(error): void {
    if (typeof(error) == 'string') {
      this.alertMessage = error;
    } else if (error && error.code) {
      switch (error.code) {
        case "auth/email-already-in-use":
            this.alertMessage = "That email is already in use!"
            break;
        case "auth/invalid-email":
            this.alertMessage = "That email is not valid!"
            break;
        case "auth/operation-not-allowed":
            this.alertMessage = "Your account has been disabled. Please contact support!"
            break;
        case "auth/weak-password":
            this.alertMessage = "Password should be at least 6 characters!"
            break;
        case "auth/user-disabled":
            this.alertMessage = "Your account has been disabled. Please contact support!"
            break;
        case "auth/user-not-found":
            this.alertMessage = "We could not find your account, try another email address"
            break;
        case "auth/wrong-password":
            this.alertMessage = "That was the wrong password, please try again"
            break;
        default:
            this.alertMessage = "Failed to sign up."
      }
    }
    let alert = this.alertController.create({
      title: 'Sign Up Failed',
      message: this.alertMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  presentModal() {
  }
}
