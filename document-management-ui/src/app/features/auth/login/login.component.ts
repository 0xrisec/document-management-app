import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/user.service';
import { FormComponent } from '../../../shared/components/form/form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onSubmit(formData: any): void {
      const user = {
        email: formData.email,
        password: formData.password
      };
  
      this.userService.loginUser('http://localhost:3000/auth/login', user).subscribe(
        {
          next: (res:any) => {
            localStorage.setItem('accessToken', res.access_token);
            this.router.navigate(['/dashboard'])
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: err.message, life: 3000  });
          }
        }
      )
  }
}
