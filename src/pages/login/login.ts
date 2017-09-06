import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from "../../providers/auth/auth";
import { AppProvider } from "../../providers/common";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  credentials = {
    email: "test@gmail.com",
    password: "abc123"
  } as usercreds;

  constructor(public authService: AuthProvider,
              public navCtrl: NavController,
              public appService: AppProvider,
              public navParams: NavParams) {
  }
 
  signin() {
    this.appService.presentLoadingDefault("Authenticating...");
    this.authService.login(this.credentials).then((res) => {
      this.appService.hideLoadingDefault();
      if (!res.code) {
        this.navCtrl.setRoot("TabsPage");
      } else {
        const title = "Login Error";
        const subTitle = res;
        this.appService.presentAlert(title, subTitle);
      }
    })
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }

}
