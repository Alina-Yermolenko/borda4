import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import config from 'src/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  token: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  jsonResponse: { 'jwt_token': string } = { 'jwt_token': '' };
  showRegister: boolean = false;
  responseDiv: string = '';
  titleDiv: string = 'Sign in';

  registerUser(email: string, password: string) {
    let passwordFunc = this.validatePassword(password)
    let emailFunc = this.validateEmail(email)
    if (passwordFunc === true && emailFunc === true) {
      this.registerAccount(email, password)
    }
    else return;
  }

  validatePassword(password: string) {
    if (password.length >= 5) {
      return true;
    }
    this.setDivResponse('Password is too short')
    return false;
  }

  validateEmail(email: string) {
    if (email.length >= 5 && email.includes('@')) {
      return true;
    }
    this.setDivResponse('Email is too short or needs @')
    return false;
  }

  setDivResponse(text: string) {
    return this.responseDiv = text;
  }

  loginUser() {
    this.enterAccount(this.emailInput, this.passwordInput)
  }

  async registerAccount(email: string, password: string) {
    const response = await fetch(config.hostUrl + '/auth/register', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    })

    this.giveRegisterResponse(response.status)
  }

  giveRegisterResponse(response: number) {
    if (response === 400) {
      return this.setDivResponse('Please provide email and password to register')
    }
    if (response === 500) {
      return this.setDivResponse('Name already used by another user')
    }
    if (response === 200) {
      return this.setDivResponse('Registered succesfully')
    }
    return this.setDivResponse('Server error')
  }

  async enterAccount(email: string, password: string) {
    let response = await fetch(config.hostUrl + '/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    })

    if (response.status === 400) {
      return this.setDivResponse('Email or password is wrong')
    }
    if (response.status === 200) {
      this.jsonResponse = await response.json();
      this.token = this.jsonResponse.jwt_token;
      localStorage.setItem('token', this.token);
      const responseProfile = await fetch(config.hostUrl + '/users/me', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Access-Control-Allow-Origin': config.hostUrl + '/',
          'Access-Control-Allow-Credentials': 'true',
          "Authorization": "Bearer " + this.token,
          "Content-Type": "application/json"
        },
      })

      this.giveEnterResponse(responseProfile.status)
    }
    return this.responseDiv = 'Something is wrong, try again later';
  }

  giveEnterResponse(status: number) {
    if (status === 200) {
      this.router.navigate(['/dashboard']);
      return this.setDivResponse('Enter successfully')
    }
    if (status === 400) {
      return this.setDivResponse('Email or password is wrong')
    }
    return this.setDivResponse('Something is wrong, try again later')

  }

  registerForm() {
    this.showRegister = true;
    this.titleDiv = "Sign up"

  }

  loginAccount() {
    this.showRegister = false;
    this.titleDiv = "Sign in"
  }
}
