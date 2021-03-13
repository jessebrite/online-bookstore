import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@common/user';
import { AuthenticationService } from '@services/authentication.service';

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
  url = 'register';
  successMessage = '';
  errorMessage = '';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    // If any of the form fields is empty, throw the error msg
    if (
      !this.user?.firstname ||
      !this.user?.lastname ||
      !this.user?.username ||
      !this.user?.email ||
      !this.user?.password ||
      !this.user?.confirmPassword
    ) {
      this.formError = 'Please all fields required';
    } else if (form.valid) {
      this.doRegistration(this.user, this.url);
      // this.submitted = false;
    }
  }
  public doRegistration(user: User, url: string): void {
    this.authenticationService.processAuthentication(user, url).subscribe(
      (data: User) => {
        console.log('data: ', data), (this.user = data);
        this.successMessage = data.message;
        if (this.successMessage.length > 0) {
          this.userSent = true;
        }
      },
      (error) => {
        console.log('error: ', error);
        this.errorMessage = error;
      }
    );
  }
}
