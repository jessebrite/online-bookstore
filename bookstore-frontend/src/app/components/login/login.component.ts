import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  wrongCredentials = false;
  returnUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  public onSubmit(form: NgForm): void {
    this.submitted = true;
    if (!this.user.username || !this.user.password) {
      this.formError = 'Please fill the required fields';
    } else if (form.valid) {
      this.doLogin(this.user, this.url);
      this.userSent = true;
    }
  }

  public doLogin(user: User, url: string): void {
    this.authenticationService
      .processAuthentication(user, url)
      .subscribe((data: any) => {
        if (!data.token) {
          this.message = data.message;
          this.wrongCredentials = true;
        } else {
          // console.log('data: ', data.roles);
          this.populateLogin(data);
        }
      });
  }

  private populateLogin(data: any): void {
    this.tokenService.saveToken(data.token);
    this.tokenService.saveUser(data);
    if (
      this.returnUrl?.startsWith('/admin') &&
      !data.roles.includes('ROLE_ADMIN')
    ) {
      // console.log('anada anda');
      this.message = 'Unauthorized!';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 250);
    }
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
