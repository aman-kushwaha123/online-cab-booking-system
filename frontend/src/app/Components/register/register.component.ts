import { Component,inject} from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input"
import {MatCardModule} from "@angular/material/card"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { BackbuttonService } from '../../services/backbutton.service';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,MatCardModule,MatFormFieldModule,MatButtonModule,NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router=inject(Router)
  toastrService=inject(ToastrService)
  authService=inject(AuthService);
  formBuilder=inject(FormBuilder);
  backbuttonService=inject(BackbuttonService)
  registerform=this.formBuilder.group({
    username:['',[Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z ]+$')]],
    email:['',[Validators.email,Validators.email,Validators.required]],
    mobile_no:['',[Validators.required,Validators.minLength(10)]],
    address:['',[Validators.required]],
    password:['',[Validators.minLength(5),Validators.required]],

  })

  register(){

    const values=this.registerform.value;
    console.log(values)
    this.authService.register(values).subscribe({
      next:(res)=>{
        this.toastrService.success('User registered Successfully!','Success')
        this.router.navigateByUrl("login");
      },
      error:(res)=>{
         this.toastrService.error('Registration failed.Please try again','Error')
      }
    })
    
  }
   
}
