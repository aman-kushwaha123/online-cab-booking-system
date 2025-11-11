import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css'
})
export class FirstPageComponent {
  authService=inject(AuthService)
  toastrService=inject(ToastrService)

  NgOnInit(){
    if(this.authService.isLoggedIn){
      this.authService.logout()
    }
  }

  


 


}
  