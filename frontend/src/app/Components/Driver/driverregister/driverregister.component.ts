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
import { Driver } from '../../../types/driver';
import { BackbuttonService } from '../../../services/backbutton.service';

@Component({
  selector: 'app-driverregister',
  standalone: true,
  imports: [MatInputModule,MatCardModule,MatFormFieldModule,MatButtonModule,NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './driverregister.component.html',
  styleUrl: './driverregister.component.css'
})
export class DriverregisterComponent {
    formbuilder=inject(FormBuilder)
    toastrService=inject(ToastrService)
    router=inject(Router)
    driverService=inject(DriverService)
    backbuttonService=inject(BackbuttonService)

    registerform=this.formbuilder.group({
      drivername:['',[Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z ]+$')]],
      email:['',[Validators.required,Validators.email]],
      license_no:['',[Validators.required,Validators.minLength(16)]],
      vehicle_no:['',[Validators.required,Validators.minLength(10)]],
      vehicle_type:['',Validators.required,Validators.minLength(5)],
      mobile_no:['',[Validators.required,Validators.minLength(10)]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })
    
    register(){
      let values=this.registerform.value as Driver
      this.driverService.registerdriver(values!).subscribe({
        next:(res:any)=>{
          this.router.navigateByUrl("/login")
           this.toastrService.success('Driver Registered','Success')
        },
        error:(res)=>{
          this.toastrService.error('Unable to Register','Error')
        }

      })
    }


}
