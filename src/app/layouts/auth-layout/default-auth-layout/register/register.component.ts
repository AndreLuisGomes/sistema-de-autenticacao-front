import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegisterDTO } from '../../../../../models/auth/user';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { CommonUXService } from '../../../../services/common-ux.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
  isPasswordValid = true;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, public commonService: CommonUXService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('renter', Validators.required),
    });
    this.commonService.reset();
  }

  register() {
    this.registerForm.markAllAsTouched()
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value as UserRegisterDTO).subscribe({
        next: session => {
          this.authService.currentUser.set(session);
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

  commonRegisterOption() {
    this.commonService.toggleRegisterCanProceed();
    this.commonService.toggleRegisterOptions();

  }

  owner() {
    this.registerForm.get('role')?.setValue('owner');
    this.commonRegisterOption();
  }

  renter() {
    this.commonRegisterOption();
  }


  passwordVerify() {

  }
}
