import { Component } from '@angular/core';
import { MenuController, AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';
import { MainPage } from '../pages';

import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  alertMessage: string;

  constructor(
      private navCtrl: NavController,
      private auth: AuthProvider,
      private menu: MenuController,
      private alertController: AlertController,
      private loadingCtrl: LoadingController) {
  }

  openLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  openSignupPage() {
    this.navCtrl.push(SignupPage);
  }
  loginUserWithFacebook() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.auth.loginWithFacebook().subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        this.menu.enable(true);
        this.navCtrl.setRoot(MainPage);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.ShowError(err);
      }, 1000);
    });
  }
  loginUserWithTwitter() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.auth.loginWithTwitter().subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        this.menu.enable(true);
        this.navCtrl.setRoot(MainPage);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.ShowError(err);
      }, 1000);
    });
  }
  loginUserWithGoogle() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.auth.loginWithGoogle().subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        this.menu.enable(true);
        this.navCtrl.setRoot(MainPage);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.ShowError(err);
      }, 1000);
    });
  }
  
  ShowError(error): void {
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
      subTitle: this.alertMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the welcome page
    //this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the welcome page
    //this.menu.enable(true);
  }

  openTermsPage() {
    this.navCtrl.push(TermsPage);
  }
  openPrivacyPage() {
    this.navCtrl.push(PrivacyPage);
  }
}
