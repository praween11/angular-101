import { Component } from '@angular/core';
import { UserForm } from '../models/user-form';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: UserForm = new UserForm();

  constructor(private authService: AuthService, private dialog: MatDialog, private storageService: StorageService){}
  onSubmit() {
    const { username, email, password } = this.form;
    
    this.storageService.saveUser({
      username, email, password: '***'
    });

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    const result = this.authService.register(username, email, password).subscribe({
      next: data=>{
        console.log(data);
      },
      error: data=>{
        console.error(data);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: data.error.message}
        })
      }
    })
  }
  signUp() {
    console.log('hello');
  }
}
