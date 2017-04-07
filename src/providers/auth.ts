import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import firebase from 'firebase';

// Providers
import {DataProvider} from './data';

interface LDSWarUser {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  provider?: string;
}

@Injectable()
export class AuthProvider {

  public user: any;
  public authData: any;
  public authState: FirebaseAuthState;

  constructor(
      private af: AngularFire,
      private fb: Facebook,
      private twitter: TwitterConnect,
      private data: DataProvider,
      private platform: Platform) {

    //this.authState = this.af.auth.getAuth(); // deprecated
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });

//    this.af.database.list('pushTest').push({
//      teste: 'teste'
//    }).then((data) => {
//      console.log(data);
//    });
  }

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(afAuthData => {
        if (afAuthData) {
          this.data.object('users/' + afAuthData.uid).subscribe(userData => {
            console.log(userData);
            this.user = userData;
            observer.next(userData);
          });
        } else {
	  console.log("No Auth Data in getUserData");
	  this.user = null;
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then((afAuthData: any) => {
        let displayName = credentials.firstName + ' ' + credentials.lastName;
        this.af.database.list('users').update(afAuthData.uid, {
	  firstName: credentials.firstName,
	  lastName: credentials.lastName,
          displayName: displayName,
          email: afAuthData.auth.email,
          emailVerified: false,
          provider: 'email',
          image: 'http://www.gravatar.com/avatar?d=mm&s=140'
        });
        credentials.created = true;
        observer.next(credentials);
      }).catch((error: any) => {
        if (error) {
          switch (error.code) {
            case 'INVALID_EMAIL':
              observer.error('E-mail inválido.');
              break;
            case 'EMAIL_TAKEN':
              observer.error('Este e-mail já está sendo utilizado.');
              break;
            case 'NETWORK_ERROR':
              observer.error('Aconteceu algum erro ao tentar se conectar ao servidor, tente novamente mais tarde.');
              break;
            default:
              observer.error(error);
          }
        }
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((afAuthData) => {
        this.data.object('users/' + afAuthData.uid).subscribe(userData => {
          console.log(userData);
          this.user = userData;
          observer.next(userData);
        });
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        this.fb.login(['public_profile', 'email']).then(facebookData => {
          let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          firebase.auth().signInWithCredential(provider).then(firebaseUser => {
            this.af.database.list('users').update(firebaseUser.uid, {
              name: firebaseUser.displayName,
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
        this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then((facebookData) => {
          this.af.database.list('users').update(facebookData.auth.uid, {
            name: facebookData.auth.displayName,
            email: facebookData.auth.email,
            provider: 'facebook',
            image: facebookData.auth.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  loginWithTwitter() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        this.twitter.login().then(function (response) {
          let provider = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
          console.log('Logged into Twitter!', response);
          firebase.auth().signInWithCredential(provider).then(firebaseUser => {
            this.af.database.list('users').update(firebaseUser.uid, {
              name: firebaseUser.displayName,
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
        this.af.auth.login({
          provider: AuthProviders.Twitter,
          method: AuthMethods.Popup
        }).then((twitterData) => {
          this.af.database.list('users').update(twitterData.auth.uid, {
            name: twitterData.auth.displayName,
            email: twitterData.auth.email,
            provider: 'twitter',
            image: twitterData.auth.photoURL
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
      firebase.auth().sendPasswordResetEmail(email).then(function() {
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
    this.af.auth.logout();
  }
}