import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  reset_form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.reset_form = this.fb.group({
      confirmpass: ['', Validators.required],
      newpassword: ['', Validators.required],
      email: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  resetPassword(data) {
    var _self = this;
    if (data.newpassword != data.confirmpass) {
      this.api.errorToast('Password and confirm password must be same.');
    } else {
      let formData = new FormData();
      formData.append("email", this.reset_form.get('email').value);
      formData.append("newpassword", this.reset_form.get('newpassword').value);
      formData.append("confirmpass", this.reset_form.get('confirmpass').value);
      formData.append("code", this.reset_form.get('code').value);

      this.api.post("resetPassword", formData).subscribe(
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

}
