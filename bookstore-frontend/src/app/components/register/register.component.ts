import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@common/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // form: NgForm;
  formError = '';
  user: User = new User();
  userSent = false;
  submitted = false;
  enabled = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    // If any of the form fields is empty, throw the error msg
    if (
      !this.user?.firstname ||
      !this.user?.lastname ||
      !this.user?.email ||
      !this.user?.password ||
      !this.user?.confirmPassword
    ) {
      this.formError = 'Please all fields required';
    } else {
      this.enabled = true;
      // this.sendOrder();
      this.userSent = true;
    }
  }
}
