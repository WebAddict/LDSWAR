import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public hits: number;
  public menuenabled: boolean = false;

  constructor(
      private navCtrl: NavController,
      private menu: MenuController,
      private auth: AuthProvider,
      private storage: Storage) {

    storage.get('totalHits').then((val) => {
      console.log("got " + val + " hits from storage");
      if (val && val > 0) {
        this.hits = val + 1;
      } else {
        this.hits = 1;
      }
      storage.set('totalHits', this.hits);
    })

  }

  logout() {
    this.auth.logout();
  }

  login() {
    this.navCtrl.setRoot(WelcomePage);
  }

  addItem(){
  }
 
  viewItem(){
 
  }
  ionViewDidLoad(){
 
  }
}
