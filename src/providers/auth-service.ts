import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  //public myAccount: any;
  constructor(public auth$: AngularFireAuth, public http: Http) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    //this.myName = "Hi there";
    console.log('Hello AuthService Provider');
    console.log(this.authState);
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }
  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
}
