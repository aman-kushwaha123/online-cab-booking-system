import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router,RouterLink } from '@angular/router';
import { DriverService } from '../../services/driver.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   driverService=inject(DriverService)
   toastrService=inject(ToastrService)
   router=inject(Router);
   driver:any
   localdriver:any
   authService=inject(AuthService)
   ngOnInit(){
     this.driver=localStorage.getItem('driver') as any
      this.localdriver=JSON.parse(this.driver)
   }
   goOnline(){
    
     if(this.localdriver.status==="APPROVED")
      this.driverService.updateAvailability(this.localdriver.id,true).subscribe(result=>{
      this.toastrService.success('Now You Are Online.','Success')
      
        
      })
      else{
        this.toastrService.info('You are not approved yet.','Info')
      }

   }

   goOffline(){
     if(this.localdriver.status==="APPROVED")
      this.driverService.updateAvailability(this.localdriver.id,false).subscribe(result=>{
        this.toastrService.success('Now You Are offline.','Success')
        this.authService.logout();
        this.router.navigateByUrl('/');
       
      })
      else{
        this.toastrService.warning('You are not approved yet.','Warning')
      }

   }

}
