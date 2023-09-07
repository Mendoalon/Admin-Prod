import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {


  public formSubmitted = false;

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginFrom = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) { }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {

    google.accounts.id.initialize({
      client_id: "211741536323-9so71mg8nm6bki76n113sv3r7rvt7qbo.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }
    );

  }

  handleCredentialResponse(response: any) {
    this.authService.loginGoogle(response.credential).subscribe(resp => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/dashboard');
      });

    })

  }


  campoValido(campo: string): boolean {

    if (this.loginFrom.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  login() {

    this.formSubmitted = true;

    if (this.loginFrom.invalid) {
      return;
    }

    this.authService.login(this.loginFrom.value)
      .subscribe(resp => {
        const { remember, email } = this.loginFrom.value;

        if (remember) {
          localStorage.setItem('email', email!);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/dashboard');

      }, (err) => {
        swal.fire('Error', err.error.msg, 'error');
      });

  }


}
