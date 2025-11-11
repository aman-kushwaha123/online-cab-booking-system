import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { inject } from "@angular/core";

export const adminguard:CanActivateFn=(route,state)=>{
  const router=inject(Router)
  const authService=inject(AuthService)
   
  if(authService.isAdmin){
    return true
  }
  else{
    router.navigateByUrl('/')
    return false;
  }

}