import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { User, UserLoginDTO } from '../../../../../models/interfaces/user';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  invalidLogin: boolean = false;
  loginForm: FormGroup;
  isLoading: boolean = false;
  hidePassword = true;

  constructor(private userService: UserService, private router: Router, private authService: AuthService = inject(AuthService)) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe({
        next: (user) => {
          console.log('Logando usuário: ', user.name, 'e Token'),
          this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
          this.router.navigate(['/home']);
          this.invalidLogin = false
        },
        error: (error) => {
          console.error('Erro', error),
            this.invalidLogin = true
            this.isLoading = false;
        }
      });
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }
}
