import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgot_form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.forgot_form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  forgotPassword() {
    var _self = this;
    let formData = new FormData();
    formData.append("email", this.forgot_form.get('email').value);
    this.api.post("forgotPassword", formData).subscribe(
      result => {
        if (result["status"] == "success") {
          _self.api.successToast(result["message"]);
          _self.router.navigate(["/reset-password"]);
        }
      },
      err => {
       _self.api.successToast(err['error']['message']);
      }
    );
  }
}
