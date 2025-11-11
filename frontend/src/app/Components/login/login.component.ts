
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
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,MatCardModule,MatFormFieldModule,MatButtonModule,NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  toastrService=inject(ToastrService)
  router=inject(Router)
  formbuilder=inject(FormBuilder);
  authService=inject(AuthService)
  backbuttonService=inject(BackbuttonService)
  loginform=this.formbuilder.group({
    username:['',[Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z ]+$')]],
    password:['',[Validators.required,Validators.minLength(5)]]
  })

  login(){
    let values=this.loginform.value
    this.authService.login(values.username!,values.password!).subscribe({
     next:(res:any)=>{
      localStorage.setItem("token",res.token)
      localStorage.setItem("user",JSON.stringify(res.user))
      this.router.navigateByUrl("/home");
      this.toastrService.success('Successfully Logged In','Success')
      
     },
     error:(res)=>{
      
      this.toastrService.error('User not found','Error')
      

     }
      
    })
    
  }

}
