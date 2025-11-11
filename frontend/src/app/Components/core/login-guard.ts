import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";

export const loginguard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)
  const toastrService=inject(ToastrService)
  if (authService.isLoggedIn) {
    let token=localStorage.getItem('token');
    if(authService.istokenExpired(token)){
      toastrService.show("Please re-login","Re-Login")
      authService.logout()
    }
      router.navigateByUrl("/")
      return false;
  }
  else {
    return true;
  }

}
