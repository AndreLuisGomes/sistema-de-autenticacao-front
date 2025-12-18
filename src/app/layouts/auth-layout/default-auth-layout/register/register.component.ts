import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { User, UserLoginDTO, UserRegisterDTO } from '../../../../../models/interfaces/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router){
    this.registerForm = new FormGroup({
    name : new FormControl('',[Validators.required, Validators.minLength(2)]),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  }

  register(){
    this.registerForm.markAllAsTouched()
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value as UserRegisterDTO).subscribe({
        next: (user) => {
          console.log('Usuário registrado!', user.name)
          this.router.navigate(['/home']);
        },
        error: error => console.error('Erro', error)
      });
    }
  }

  isControlValid(controlName: string) : boolean{
    const control = this.registerForm.get(controlName);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }
}
