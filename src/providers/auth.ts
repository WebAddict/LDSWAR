import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';

import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app'; // app and typings

import { Observable } from 'rxjs/Observable';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';


// Providers
import {DataProvider} from './data';

interface LDSWarUser {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  provider?: string;
  pointsTotal?: number;
  photoURL?: string;
}

@Injectable()
export class AuthProvider {

  public firebaseUser: Observable<firebase.User> | null;
  public currentUser: any = {};
  public myUser: any;
  public uid: string | null;

  constructor(
      private fbApp: FirebaseApp,
      private afdb: AngularFireDatabase,
      private afAuth: AngularFireAuth,
      private facebook: Facebook,
      private twitter: TwitterConnect,
      private data: DataProvider,
      private platform: Platform) {

    /* `afAuth.authState` = Observable<firebase.User> */
    this.firebaseUser = afAuth.authState;
    afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.uid = firebaseUser.uid;

        // Load `currentUser`
        var currentUserRef = fbApp.database().ref('/users/' + firebaseUser.uid);
        currentUserRef.on("value", function(snapshot) {
          if (snapshot.val() === true) {
            this.currentUser = snapshot.val();
            console.log('/users/' + firebaseUser.uid, snapshot.val());
          }
        });

        // online presence
        //var myConnectionsRef = fbApp.database().ref('/users/' + firebaseUser.uid + '/connections');
        var lastOnlineRef = fbApp.database().ref('/users/' + firebaseUser.uid + '/lastOnline');
        lastOnlineRef.set(firebase.database.ServerValue.TIMESTAMP);
        var onlineUsersRef = fbApp.database().ref('/onlineUsers/' + firebaseUser.uid);
        var connectedRef = fbApp.database().ref(".info/connected");
        connectedRef.on("value", function(snapshot) {
          if (snapshot.val() === true) {
            // add this device to my connections list
            //var con = myConnectionsRef.push(true);
            onlineUsersRef.set({displayName: firebaseUser.displayName, organization: 'allenRanch', photoURL: firebaseUser.photoURL, onlineSince: firebase.database.ServerValue.TIMESTAMP});
            currentUserRef.child('onlineSince').set(firebase.database.ServerValue.TIMESTAMP);

            // when I disconnect, remove this device
            //con.onDisconnect().remove();
            onlineUsersRef.onDisconnect().remove();
            currentUserRef.child('onlineSince').onDisconnect().remove();

            // when I disconnect, update the last time I was seen online
            lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
          } else {
            //alert("not connected");
          }
        });
      } else {
        this.currentUser = null;
      }
    }, err => {
      // error in observable subscription to firebaseUser (authState)
      this.currentUser = null;
    });
  }

  getEmail() {
    //if (this.currentUser && this.currentUser.email) {
    //  return this.currentUser.email;
    //}
    return 'none';
  }

  getUserData() {
    return Observable.create(observer => {
      this.afAuth.authState.subscribe(firebaseUser => {
        if (firebaseUser) {
          //this.firebaseUser = firebaseUser;
          this.uid = firebaseUser.uid;
          this.data.object('/users/' + firebaseUser.uid).subscribe(LDSWarUser => {
            observer.next(LDSWarUser);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      if (!credentials.organization || credentials.organization != 'allenRanch') {
          observer.error("This app is currently only available for Allen Ranch Members... Support for other wards will launch July 1st 2017.");
      } else {
        this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then((firebaseUser) => {
          let displayName = credentials.firstName + ' ' + credentials.lastName;
          this.data.object('/users/' + firebaseUser.uid).set({
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            dateRegistered: firebase.database.ServerValue.TIMESTAMP,
            lastOnline: firebase.database.ServerValue.TIMESTAMP,
            displayName: displayName,
            email: credentials.email,
            emailVerified: false,
            organization: credentials.organization,
            spentPoints: 0,
            pointsTotal: 0,
            provider: 'email',
            photoURL: '../../assets/img/blank_avatar.png'
          });
          credentials.created = true;
          observer.next(credentials);
        }).catch((error: any) => {
          observer.error(error);
        });
      }
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
        this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((firebaseUser) => {
          //this.firebaseUser = firebaseUser;
          this.data.object('/users/' + firebaseUser.uid).subscribe(userData => {
            console.log(userData);
            //this.user = userData;
            //this.LDSWarUser = userData;
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
        this.facebook.login(['public_profile', 'email']).then(facebookData => {
          let credential = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          this.afAuth.auth.signInWithCredential(credential).then(firebaseUser => {
            this.data.object('/users/' + firebaseUser.uid).update({
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              provider: 'facebook',
              photoURL: firebaseUser.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        // NOT Cordova
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        provider.addScope('email');
        //provider.addScope('user_birthday');
        this.afAuth.auth.signInWithPopup(provider).then((firebaseUser) => {
          //this.firebaseUser = firebaseUser;
          this.data.object('/users/' + firebaseUser.uid).update({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            provider: 'facebook',
            photoURL: firebaseUser.photoURL
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
              photoURL: firebaseUser.photoURL
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
          //this.firebaseUser = result.user;
          this.data.object('/users/' + result.user.uid).update({
            displayName: result.user.displayName,
            email: result.user.email,
            provider: 'twitter',
            photoURL: result.user.photoURL
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
          //this.firebaseUser = result.user;
          this.data.object('/users/' + result.user.uid).update({
            displayName: result.user.displayName,
            email: result.user.email,
            provider: 'google',
            photoURL: result.user.photoURL
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
    return Observable.create(observer => {
      this.uid = null;
      //this.user = null;
      this.firebaseUser = null;
      //this.LDSWarUser = null;
      this.afAuth.auth.signOut().then(function() {
        observer.next();
      }, function(error) {
        observer.error(error);
        // An error happened.
      });
    });
  }
}