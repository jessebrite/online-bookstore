import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@common/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  formError = '';
  submitted = false;
  userSent = false;

  constructor() {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    this.submitted = true;
    if (!this.user.email || !this.user.password) {
      this.formError = 'Please fill the required fields';
    } else if (form.valid) {
      this.userSent = true;
      // this.submitted = false;
    }
  }
}
