import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

export interface SlidePages {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;
  slidePages: SlidePages[];
  showSkip = true;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController) {
      this.slidePages = [
        {
          title: "Title 1",
          description: "Description 1",
          image: 'assets/img/ica-slidebox-img-1.png',
        },
        {
          title: "Title 2",
          description: "Description 2",
          image: 'assets/img/ica-slidebox-img-2.png',
        },
        {
          title: "Title 3",
          description: "Description 3",
          image: 'assets/img/ica-slidebox-img-3.png',
        }
      ];
  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  nextSlide() {
    this.slides.slideNext();
  }

}
