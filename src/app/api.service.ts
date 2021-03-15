import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
import {
  AlertController,
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
  MenuController,
  ToastController
} from "@ionic/angular";

const baseUrl = 'http://education.codrope.com/';
const apiURL = baseUrl + 'api/users/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoading: boolean = false;
  userLoginSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  user: any = {};
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private storage: Storage,
  ) {
    this.userLoginSubject.subscribe(user => {
      this.user = user;
    })
  }
  async successToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      color: 'dark',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  async errorToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      color: 'danger',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  async showAlert(message) {
    let alert = await this.alertCtrl.create({
      header: "Alert",
      message: message,
      buttons: ["OK"]
    });
    await alert.present();
  }



  login(data) {
    return this.http.post(baseUrl + 'api/users/login', data);
  }
  post(url, data) {
    return this.http.post(apiURL + url, data);
  }
  get(url,) {
    return this.http.get(apiURL + url,);
  }
  getUserData(callback) {
    this.storage.get("user").then(callback);
  }

  updateUserData(data) {
    this.storage.set('user.data', data);
  }
  setUserData(data) {
    var _self = this;
    return of(this.storage.set('user', data).then(result => {
      console.log("storage", data)
      _self.userLoginSubject.next(data);
    }));
  }
  setToken(token) {
    window.localStorage.setItem("token", token);
  }
  removeUser() {
    this.storage.remove('user');
    this.storage.clear()
  }
  getToken() {
    return window.localStorage.getItem("token");
  }

}
