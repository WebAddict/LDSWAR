import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

export interface deleteMe {
    status: string;
    authResponse: {
        session_key: boolean;
        accessToken: string;
        expiresIn: number;
        sig: string;
        secret: string;
        userID: string;
    };
}

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  displayName: string;

  constructor(public auth$: AngularFireAuth, private fb: Facebook, private platform: Platform, storage: Storage) {
    console.log('Hello AuthService Provider');
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      //console.log(state);
    });
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        //console.log(firebaseUser);
	this.displayName = firebaseUser.displayName;
	storage.set('displayName', firebaseUser.displayName);
      } else {
        // User is signed out.
        console.log("User is signed out.");
      }
    });
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    if (this.platform.is('cordova')) {
      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
        .catch(e => console.log('Error logging into Facebook', e));

      //return Facebook.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
      //  const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      //  return firebase.auth().signInWithCredential(facebookCredential);
      //});
    } else {
      return this.auth$.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      });
    }
  }

  signInWithUsername(formData) {
//      this.af.auth.login({
//        email: formData.value.email,
//        password: formData.value.password
//      }).then(
//        (success) => {
//        console.log(success);
//        this.router.navigate(['/dashboard']);
//      }).catch(
//        (err) => {
//        console.log(err);
//        this.router.navigate(['/dashboard']);
//      })
  }
  signOut(): void {
    this.auth$.logout();
  }

  getDisplayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
}
