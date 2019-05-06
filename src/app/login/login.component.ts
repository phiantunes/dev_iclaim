import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('emailInput') emailInput:ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  login() {
    const email = this.loginForm.get('email').value;
    const senha = this.loginForm.get('senha').value;

    this.authService
    .authenticate(email, senha)
    .subscribe(data => {
      this.router.navigate(['/dashboard']);
      console.log("Logado com sucesso!");
    },
    err => {
      console.log(err)
      alert('E-mail ou senha incorretos!');
      this.loginForm.reset();
      this.emailInput.nativeElement.focus();
    });
  }

}
