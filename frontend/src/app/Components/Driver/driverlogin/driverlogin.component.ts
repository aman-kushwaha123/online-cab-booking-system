import { Component,inject} from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input"
import {MatCardModule} from "@angular/material/card"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { DriverService } from '../../../services/driver.service';
import { BackbuttonService } from '../../../services/backbutton.service';

@Component({
  selector: 'app-driverlogin',
  standalone: true,
  imports: [MatInputModule,MatCardModule,MatFormFieldModule,MatButtonModule,NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './driverlogin.component.html',
  styleUrl: './driverlogin.component.css'
})
export class DriverloginComponent {
  formbuilder=inject(FormBuilder)
  toastrService=inject(ToastrService)
  router=inject(Router)
  driverService=inject(DriverService)
  backbuttonService=inject(BackbuttonService)
  loginform=this.formbuilder.group({
    drivername:['',[Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z ]+$')]],
    password:['',[Validators.required,Validators.minLength(5)]]


  })

  

   login(){
    let values=this.loginform.value
    this.driverService.logindriver(values.drivername!,values.password!).subscribe({
      next:(res:any)=>{
        localStorage.setItem('token',res.token);
        localStorage.setItem('driver',JSON.stringify(res.driver))
        this.router.navigateByUrl("/home");
        this.toastrService.success('Successfully LoggedIn','Success')
      },
      error:(res)=>{
        this.toastrService.error('You are entering bad credentials','Error')
        
      }
      
    })
   }

}
