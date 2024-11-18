import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/user.service';
import { ValidatorFn } from '../../../interfaces/validator.interface';
import { User } from '../../../models/user.model';
import { FormComponent } from '../../../shared/components/form/form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit(formData: any): void {
    const newUser = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    this.userService.createUser('http://localhost:3000/auth/signup', newUser).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User registered successfully', life: 3000 });
          // Redirect to login
          this.router.navigate(['/login'])
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Success', detail: err.message, life: 3000  });
        }
      }
    )
  }
}
