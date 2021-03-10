import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '@common/user';
import { AuthenticationService } from '@services/authentication.service';

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
  url = 'login';
  message = '';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    this.submitted = true;
    if (!this.user.username || !this.user.password) {
      this.formError = 'Please fill the required fields';
    } else if (form.valid) {
      this.userSent = true;
      this.doLogin(this.user, this.url);
      // this.submitted = false;
    }
  }

  public doLogin(user: User, url: string): void {
    this.authenticationService
      .processAuthentication(user, url)
      .subscribe((data: User) => {
        console.log('data: ', data), (this.message = data.message);
      });
  }
}
