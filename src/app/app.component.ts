import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {ApiService} from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public api: ApiService,
    private router: Router,
    public navCtrl: NavController,
    public alertController: AlertController,
    private statusBar: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ff9700');
      this.splashScreen.hide();
    });
  }

  async doLogout() {
    let alert = await this.alertController.create({
        header: 'Education App',
        message: "Are you sure you want to Logout?",
        buttons: [{
                text: 'Yes',
                handler: () => {
                    this.api.removeUser();
                    this.router.navigateByUrl('/login');
                }
            }, 
            {
                text: 'No',
                role: 'cancel',
                handler: () => {
  
                }
            }
        ],
        cssClass: 'comment-alert'
    });
  
    await alert.present();
  }
}
