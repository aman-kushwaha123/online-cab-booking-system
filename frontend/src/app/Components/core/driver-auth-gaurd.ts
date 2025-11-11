import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

export const driverauthtgaurd:CanActivateFn=(route,state)=>{
  const router=inject(Router)
  const authService=inject(AuthService)

  if(authService.isDriver && !authService.isdriverApproved){
     router.navigateByUrl("/home")
  
    return false;
  }
  else{
    return true;
  }
}