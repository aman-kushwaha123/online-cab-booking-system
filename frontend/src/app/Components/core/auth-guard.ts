import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';


export const authguard:CanActivateFn=(route,state)=>{
   const router=inject(Router);
   
   const authService=inject(AuthService)
   if(authService.isLoggedIn){
    
     return true;
   }
   else{
     router.navigateByUrl('/')
     return false;
   }

}