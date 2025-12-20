import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegisterDTO } from '../../../../../models/interfaces/user';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  isLoading: boolean = false;
  emailInvalid: boolean = false;
  registerForm: FormGroup;
  hidePassword = true;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  register() {
    this.registerForm.markAllAsTouched()
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value as UserRegisterDTO).subscribe({
        next: (user) => {
          console.log('Usuário registrado!', user.name),
            this.authService.login(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value)
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Erro', error),
            this.emailInvalid = true;
          this.isLoading = false
        }
      });
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }
}
