import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, FirebaseObjectObservable, AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import * as moment from 'moment';

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

  // Private Methods
  private authState: FirebaseAuthState;
  private userauth;
  private userdata;
  private vaultdata;
  private profilepicdata;
//  private loading: any;

  // Public Methods
  public user;
  public storageLang: string;
  public storageTouchid: boolean = false;
  public storageEmail: string;
  public storagePwd: string;
  public referrer: string;
  public pwdNotes: string;
  public displayName: string;

  constructor(
    public auth$: AngularFireAuth,
    private fb: Facebook, 
    public af: AngularFire, 
    private platform: Platform,
    public storage: Storage) {
    
    console.log('Hello AuthService Provider');
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
      //console.log(state);
    });
    this.userdata = firebase.database().ref('/users/');
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        //console.log(firebaseUser);
	this.displayName = firebaseUser.displayName;
	storage.set('displayName', firebaseUser.displayName);
	var profile = {
		//datecreated: moment().valueOf(),
		defaultdate: 'None',
		email: firebaseUser.email,
		enabletouchid: 'false',
		fullname: firebaseUser.displayName,
		nickname: 'nickname',
		profilepic: 'http://www.gravatar.com/avatar?d=mm&s=140',
		paymentplan: 'Free'
	};
	//this.createInitialSetup();
	this.userdata = firebase.database().ref('/users/');
	this.userdata.child(firebaseUser.uid).update(profile);
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
        .then(function (res: FacebookLoginResponse) {
	  console.log('Logged into Facebook!', res);
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential);
	})
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

  signInWithEmail(credentials): firebase.Promise<FirebaseAuthState> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.auth$.login({email: credentials.email,password: credentials.password})
      .then((authData) => {
        this.userauth = authData;
        this.getUserData();
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  signUpWithEmail(credentials): firebase.Promise<FirebaseAuthState> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.auth$.createUser(credentials)
      .then((authData) => {
        this.userauth = authData;
        this.user = credentials;
        this.createInitialSetup();
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  signOut(): void {
    this.af.auth.unsubscribe();
    this.authState = null;
    this.user = null;
    //this.af.auth.logout();
  }
//  signOut(): void {
//    this.auth$.logout();
//  }

//  signInWithUsername(formData) {
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
//  }

  getDisplayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }

  LoadingControllerShow() {
//    this.loading = this.loadingCtrl.create({
//      spinner: 'ios',
//      content: 'Please wait...',
//    });
//    this.loading.present();
  }

  LoadingControllerDismiss() {
    // LUIS: Remove .catch once fix has been implemented
    // https://github.com/driftyco/ionic/issues/10046#issuecomment-274074432
    //this.loading.dismiss().catch(() => console.log('error on dismiss'));
//    this.loading.dismiss();
  }

  storageSetLanguage(lang) {
    this.storageLang = lang;
    this.storage.set('option0', lang);
  }
  storageSet(isenabled, pwd, email) {
    this.storageTouchid = isenabled;
    this.storagePwd = pwd;
    this.storageEmail = email;
    this.storage.set('option1', isenabled);
    this.storage.set('option2', pwd);
    this.storage.set('option3', email);
  }
  storageSetEmail(email) {
    this.storageEmail = email;
    this.storage.set('option3', email);
  }
  storageClean() {
    this.storageTouchid = false;
    this.storagePwd = '';
    this.storageEmail = '';
    this.storage.set('option1', false);
    this.storage.set('option2', '');
    this.storage.set('option3', '');
  }


  //
  // SING IN - CREATE USER
  //-----------------------------------------------------------------------
  createInitialSetup() {
    this.createUserProfile();
    this.createVault();
    //this.createForms();
  }

  createUserProfile() {

    // Save basic user profile
    var profile = {
      //datecreated: moment().valueOf(),
      defaultbalance: 'Current',
      defaultdate: 'None',
      email: this.user.email,
      enabletouchid: 'false',
      fullname: this.user.name,
      nickname: this.user.name,
      profilepic: 'http://www.gravatar.com/avatar?d=mm&s=140',
      paymentplan: 'Free'
    };
    this.user.enabletouchid = profile.enabletouchid;
    this.user.profilepic = profile.profilepic;
    
    // Save user profile
    this.userdata.child(this.userauth.uid).update(profile);
  }

  createVault() {

    // Set basic vault defaults
    var vaultuser = {
        isadmin: true,
        createdby: this.user.email,
        //dateCreated: moment().valueOf(),
    };

    // Create node under houses and get the key
    this.user.vaultid = this.vaultdata.push().key;

    // Save key into the user->houseid node 
    this.userdata.child(this.userauth.uid).update({vaultid : this.user.vaultid});

    // Add member to housemembers node under Houses
    this.vaultdata.child(this.user.vaultid + "/vaultusers/" + this.userauth.uid).update(vaultuser);

  }

  //
  // PERSONAL PROFILE
  //-----------------------------------------------------------------------

  getUserData() { 
    const thisuser$ : FirebaseObjectObservable<any> = this.af.database.object('/users/' + this.userauth.uid); 
    thisuser$.subscribe((val) => {
      this.user = val;
    });
  }

  updateName(newname: string) {
    this.userdata.child(this.userauth.uid).update({'fullname' : newname});
  }

  updateEmail(newEmail: string) {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updateEmail(newEmail)
      .then(function() {
        this.user.email = newEmail;
        this.updateEmailNode(newEmail);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  updatePassword(newPassword: string) {    
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.updatePassword(newPassword)
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

  deleteData() {
    //
    // Delete ALL user data
    this.vaultdata.child(this.user.vaultid).remove();
    this.userdata.child(firebase.auth().currentUser.uid).remove();
  }

  deleteUser() {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      let user = firebase.auth().currentUser;
      user.delete()
      .then(function() {
        resolve();
      }).catch(function(error) {
        reject(error);
      });
    });
  }

  savePicture(pic) {
    this.profilepicdata.child(firebase.auth().currentUser.uid).child('profilepicture.png')
    .putString(pic, 'base64', {contentType: 'image/png'}).then((savedpicture) => {
      this.userdata.child(firebase.auth().currentUser.uid).update({'profilepic' : savedpicture.downloadURL});
    });
  }

  updateEmailNode(newemail) {
    this.userdata.child(this.userauth.uid).update({'email' : newemail});
  }

}
