import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginData: any = {};
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }
  //===================Login===========================

  doLogin() {
    var _self = this;
    let formData = new FormData();
    formData.append("email", this.loginForm.get('email').value);
    formData.append("password", this.loginForm.get('password').value);
    this.loading = true;
    // _self.isReady =true;
    this.api.login(formData).subscribe(
      result => {
        if (result["status"] == "success") {
          this.loading = false
          _self.loginData = result['data']
          _self.api.setUserData(result['data']);
          _self.api.setToken(result['data']['token']);
          _self.api.successToast(result['message']);
          _self.router.navigate(["/tabs/dashboard"]);
        } else if (result["status"] == "error") {
          _self.api.successToast(result['message']);
        }
      },
      err => {
        _self.api.successToast(err['error']['message']);
      }
    );
  }

  //=====================end==================
}
