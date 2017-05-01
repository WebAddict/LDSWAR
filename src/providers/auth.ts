import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase/app';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';

//import { User as FirebaseUser } from 'firebase/auth';

// Providers
import {DataProvider} from './data';

interface LDSWarUser {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  provider?: string;
  totalPoints?: number;
}

@Injectable()
export class AuthProvider {

  firebaseUser: any;
  public LDSWarUser: any;
  public user: any;
  public uid: string;
  public authData: any;
  //public authState: FirebaseAuthState;

  constructor(
      fbapp: FirebaseApp,
      private afdb: AngularFireDatabase,
      private afAuth: AngularFireAuth,
      private fb: Facebook,
      private twitter: TwitterConnect,
      private data: DataProvider,
      private platform: Platform) {

    /* `afAuth.authState` = Observable<firebase.User> */
    afAuth.authState.subscribe(firebaseUser => {
      this.firebaseUser = firebaseUser;
      this.uid = firebaseUser.uid;
    });
    //this.firebaseUser = afAuth.authState;
    //this.afAuth.subscribe((state: FirebaseAuthState) => {
    //  this.authState = state;
    //  this.uid = state.uid;
    //});

//    this.afdb.list('pushTest').push({
//      teste: 'teste'
//    }).then((data) => {
//      console.log(data);
//    });
  }

  getUserData() {
    return Observable.create(observer => {
      this.afAuth.authState.subscribe(firebaseUser => {
        this.firebaseUser = firebaseUser;
        this.uid = firebaseUser.uid;
        if (firebaseUser) {
          this.data.object('/users/' + firebaseUser.uid).subscribe(LDSWarUser => {
            this.user = LDSWarUser;
            this.LDSWarUser = LDSWarUser;
            observer.next(LDSWarUser);
          });
        } else {
          this.uid = null;
          this.user = null;
          this.firebaseUser = null;
          this.LDSWarUser = null;
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then((firebaseUser) => {
        let displayName = credentials.firstName + ' ' + credentials.lastName;
        this.data.object('/users/' + firebaseUser.uid).set({
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          displayName: displayName,
          email: credentials.email,
          emailVerified: false,
          provider: 'email',
          image: 'http://www.gravatar.com/avatar?d=mm&s=140'
        });
        credentials.created = true;
        observer.next(credentials);
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
        this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((firebaseUser) => {
          this.firebaseUser = firebaseUser;
          this.data.object('/users/' + firebaseUser.uid).subscribe(userData => {
            console.log(userData);
            this.user = userData;
            this.LDSWarUser = userData;
            observer.next(userData);
          });
        }).catch(function(error) {
          // Handle Errors here.
          console.log(error);
          observer.error(error);
        });
    });
  }

  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        this.fb.login(['public_profile', 'email']).then(facebookData => {
          let credential = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          this.afAuth.auth.signInWithCredential(credential).then(firebaseUser => {
            this.data.object('/users/' + firebaseUser.uid).update({
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              provider: 'facebook',
              image: firebaseUser.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        provider.addScope('email');
        //provider.addScope('user_birthday');
        this.afAuth.auth.signInWithRedirect(provider).then((firebaseUser) => {
          this.firebaseUser = firebaseUser;
          this.data.object('/users/' + firebaseUser.uid).update({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            provider: 'facebook',
            image: firebaseUser.photoURL
          });
          observer.next();
        });
      }
    });
  }

  loginWithTwitter() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        this.twitter.login().then(function (response) {
          let credential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
//          console.log('Logged into Twitter!', response);
          this.afAuth.auth.signInWithCredential(credential).then(firebaseUser => {
            this.data.object('/users/' + firebaseUser.uid).update({
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              provider: 'twitter',
              image: firebaseUser.photoURL
            });
            observer.next();
          }, function (error) {
            console.info("error", error);
            observer.error(error);
          }).catch((error) => {
            console.info("error", error);
            observer.error(error);
          });
        }, error => {
          console.info("error", error);
          observer.error(error);
        });
      } else {
        let provider = new firebase.auth.TwitterAuthProvider();
        this.afAuth.auth.signInWithPopup(provider).then((result) => {
          console.log(result);
          this.firebaseUser = result.user;
          this.data.object('/users/' + result.user.uid).update({
            displayName: result.user.displayName,
            email: result.user.email,
            provider: 'twitter',
            image: result.user.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  loginWithGoogle() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
          observer.error("No Cordova Support");
      } else {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        this.afAuth.auth.signInWithPopup(provider).then((result) => {
          console.log(result);
          this.firebaseUser = result.user;
          this.data.object('/users/' + result.user.uid).update({
            displayName: result.user.displayName,
            email: result.user.email,
            provider: 'google',
            image: result.user.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  sendPasswordResetEmail(email) {
    return Observable.create(observer => {
      this.afAuth.auth.sendPasswordResetEmail(email).then(function() {
        observer.next();
        // Email sent.
      }, function(error) {
        observer.error(error);
        // An error happened.
      });
    });
  }

  logout() {
    this.user = null;
    this.LDSWarUser = null;
    this.afAuth.auth.signOut();
  }
}