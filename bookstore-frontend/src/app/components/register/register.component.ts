import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@common/user';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  userSent = false;
  submitted = false;
  url = 'register';
  successMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      this.doRegistration(this.user, this.url);
    }
  }
  public doRegistration(user: User, url: string): void {
    this.authenticationService.processAuthentication(user, url).subscribe(
      (data: User) => {
        console.log('data: ', data), (this.user = data);
        this.successMessage = data.message;
        if (this.successMessage.length > 0) {
          this.userSent = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      },
      (error) => {
        // console.log('error:	', error)
        this.errorMessage = error;
      }
    );
  }
}
