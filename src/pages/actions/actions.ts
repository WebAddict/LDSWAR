import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html'
})
export class ActionsPage {

  public points: FirebaseObjectObservable<any>;
  public pointHistory: FirebaseListObservable<any>;
  //let point
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private auth: AuthProvider,
      af: AngularFire) {

    this.points = af.database.object('/points/' + this.auth.uid);
    this.pointHistory = af.database.list('/points/' + this.auth.uid + '/history');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionsPage');
  }
  addPoints(points: number) {
    this.pointHistory.push({pointValue: points});
  }
  deletePoint(item) {
    this.pointHistory.remove(item);
  }

  reportScriptures() {
    this.addPoints(100);
  }

}
