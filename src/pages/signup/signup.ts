import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {name: string, email: string, password: string} = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };
  
  alertMessage: string;

  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public auth: AuthService,
              public toastCtrl: ToastController) {
  }

  doSignup() {
    // Attempt to login in through our auth service
    this.auth.signUpWithEmail(this.account).then(() => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.SignUpError(err);
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
