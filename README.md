# LDSWAR - "Wake And Rise"
"Wake and Rise" is an app for LDS Members of the Allen Ranch Ward of the Arizona Gilbert Greenfield Stake. It can be accessed at [LDSWAR.com](https://ldswar.com/).

## Contribute to Development

We welcome your contributions! The following information is written for all programmer experience levels! If you are 12 years old or 40 years old, have many years experience programming or ZERO experience, you can follow these instructions to get the app running on your computer and/or device. You can heavily contribute, or you can just look at the code to see how it works. Please enjoy!

#### For our New/Novice programers: A Quick Background on Apps
When mobile devices and apps became a thing in 2007 (and for many years after), an app developer had only two choices: Build the app on Apple, or on Android.

The two platforms were completely different systems, they had different features and were different languages, amd built with different tools. It was impossible to copy your Android app to Apple unless you re-wrote it from scratch.

This is known as a "Native App": a smartphone application developed for a specific mobile operating system (Objective-C or Swift for iOS vs. Java for Android).

A few years ago, more apps started being built using a wrapper called [Cordova](https://cordova.apache.org/) that could take a set of HTML pages and run it on your device, with the look and most functionality of a native app. 

This is known as a "Hybrid App". It's not as fast or powerful as a native app, but over the last two years it has gotten better and better. Some of your favorite apps are Hybrid including Twitter and Instagram!

#### This is a HYBRID App
This software is built on a Cross Platform environment built on Javascript, HTML and CSS. Contributer's SHOULD refer to the documentation!

The interface is built on:
[Ionic 3](http://ionicframework.com/)

Javascript components:
[Angular 4](https://angular.io/) ([Docs](https://angular.io/docs/ts/latest/guide/)), [Typescript 2](https://www.typescriptlang.org/), and [ReactiveX](http://reactivex.io/)

Native components (like camera):
[Ionic Native](https://ionicframework.com/docs/v2/native/) which extends [Cordova](https://cordova.apache.org/) (that makes it possible to build an app out of html & javascript!)

Backend:
[Firebase Database](https://firebase.google.com/docs/database/) ([Docs](https://firebase.google.com/docs/database/web/start), [Ref](https://firebase.google.com/docs/reference/js/firebase.database)) powers our database.
[Firebase Auth](https://firebase.google.com/docs/auth/) ([Docs](https://firebase.google.com/docs/auth/web/start), [Ref](https://firebase.google.com/docs/reference/js/firebase.auth)) powers our user management.
[AngularFire 2](https://github.com/angular/angularfire2) is the bridge between Firebase and Angular, giving us live 2-way bindings on data.

## Development Pre-Requsites
Note: Most of this development uses Command-Line Tools.

1. Latest [Node & NPM](https://nodejs.org/en/download/) installed
2. Latest [Git Client](https://git-scm.com/download) installed
3. All contributers: Latest [Android SDK](https://developer.android.com/studio/index.html) installed
4. Mac contributers: Latest [XCode](https://developer.apple.com/xcode/) installed
5. Latest [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) installed

### Install Global Packages
Open your favorite command line client (Windows: click `Windows Key + 'r'` to get the "Run" window, then type `cmd` and click ok)

```sh
npm install -g cordova ionic typings typescript firebase-tools @angular/cli
```

### Setup Project
If you don't have a common project folder, I reccomend setting up a "Projects" folder right at the Root of your Hard Drive = /Projects

```sh
git clone https://github.com/WebAddict/LDSWAR.git
cd LDSWAR
npm install
ionic resources
```

## Project Structure
Most of our code is in the `src` folder.

## Run the app in your browser

```sh
ionic serve
```
This will launch the app right in your browser

## Run the app on your ANDROID phone/tablet
Plug in your device, make sure your Settings for ADB Debugging are enabled, and that you can see your device when running `adb devices`

```sh
ionic run android --prod
```

This will launch the app right on your android device

## Run the app on your iPhone/iPad
First Build the xcode profile by running
```sh
ionic build ios --prod
```

Then open the project in Xcode. Plug in your device, and press the "play" button to run the app right on your device.

## Credits
This app relies on works created by others. As we incorporate their works, we will include them here.


## Rights
Copyright 2017 Richard Johnson

## License

Please see the license file for more information.