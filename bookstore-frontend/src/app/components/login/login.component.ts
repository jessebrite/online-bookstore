import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@common/user';
import { AuthenticationService } from '@services/authentication.service';
import { TokenStorageService } from '@services/token-storage.service';

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
  noErrors = false;

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    this.submitted = true;
    if (!this.user.username || !this.user.password) {
      this.formError = 'Please fill the required fields';
    } else if (form.valid) {
      // do {
      this.doLogin(this.user, this.url);
      this.userSent = true;
      // } while (this.noErrors === true);
      // this.submitted = false;
    }
  }

  public doLogin(user: User, url: string): void {
    this.authenticationService
      .processAuthentication(user, url)
      .subscribe((data: User) => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data);
        this.router.navigate(['/']);
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
