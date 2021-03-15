import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  edit_form: FormGroup;
  getProfileData: any = {};
  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    private router: Router
  ) {
    this.edit_form = this.fb.group({
      password: ['', Validators.required],
      birth_date: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.api.userLoginSubject.subscribe(user => {
      this.getProfileData = user;
     })
    this.getProfile();
  }
  //================Update Profile==================

  updateProfile() {
    var _self = this;
    let formData = new FormData();
    formData.append("password", this.edit_form.get('password').value);
    formData.append("birth_date", this.edit_form.get('birth_date').value);
    formData.append("address", this.edit_form.get('address').value);
    this.api.post("updateProfile", formData).subscribe(
      result => {
        if (result["status"] == "success") {
          _self.api.successToast(result["message"]);
          _self.router.navigate(["/profile"]);
        }
      },
      err => {

        _self.api.successToast(err['error']['message']);
      }
    );
  }
//=======================end=================

//=====================get profile==============
  getProfile() {
    var _self = this;
    let data = {};
    this.api.get("profile").subscribe(
      result => {
        if (result["status"] == "success") {
          _self.getProfileData = result['data'];
          this.edit_form.patchValue(result['data']);
          console.log("m", _self.getProfileData);
          _self.api.successToast(result["message"]);
        } else if (result["status"] == "error") {
          _self.api.successToast(result["message"]);
        }
      },
      err => {
        _self.api.successToast(err['message']);
      }
    );
  }

}


  //===============end===========================

