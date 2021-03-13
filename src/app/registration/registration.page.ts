import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registration_form: FormGroup;
  user: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.registration_form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    var _self = this;
    this.api.getUserData(function (user) {
      _self.user = user;
    });
  }

  doRegister() {
    var _self = this;
    let formData = new FormData();
    formData.append("email", this.registration_form.get('email').value);
    formData.append("password", this.registration_form.get('password').value);
    formData.append("first_name", this.registration_form.get('first_name').value);
    formData.append("last_name", this.registration_form.get('last_name').value);
    formData.append('role','Student');
    this.api.post("register", formData).subscribe(
      result => {
        if (result["status"] == "success") {
          _self.api.successToast(result["message"]);
          _self.router.navigate(["/login"]);
        }
      },
      err => {
      
        _self.api.successToast(err['error']['message']);
      }
    );
  }

}
