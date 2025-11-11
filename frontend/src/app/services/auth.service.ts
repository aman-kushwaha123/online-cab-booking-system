import { catchError,filter,Observable,throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {  Router, NavigationEnd } from '@angular/router';
 import { delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from './driver.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http=inject(HttpClient);
  router=inject(Router)
  toastrService=inject(ToastrService)
  driverService=inject(DriverService)

  constructor() { }

  register(values:object){
    return this.http.post(environment.apiUrl+"/user/register",values)
  }




  login(username:String,password:String){
    return this.http.post<any>(environment.apiUrl+"/user/login",{
      username,
      password
    })
    
  }


  logout() {
    localStorage.removeItem("token")
    const user = localStorage.getItem("user") || null
    if (user) {
      localStorage.removeItem("user")
      let driver = localStorage.getItem('driver')
      if(driver){
         let localdriver = JSON.parse(driver)
         if (localdriver.status === "APPROVED")
         this.driverService.updateAvailability(localdriver.id, false).subscribe(result => {

         })
      }

    }
    else {
      localStorage.removeItem("driver")
      localStorage.removeItem("bookings")
    }

    this.router.navigateByUrl("/")

  }

  get isLoggedIn(){
    const token=localStorage.getItem('token');
    if (token){
      return true;
    }
    else{
      return false;
    }
  }

  get isAdmin(){
    const user=localStorage.getItem('user') as any
      if(user){
        if(JSON.parse(user).roles[0]==="ADMIN"){
             return true;
        }else{
          return false;
        }
      }
     else{
      return false;
     }
       
   
  }


  get isDriver(){
     const localdriver=localStorage.getItem("driver") as any
     const driver=JSON.parse(localdriver)
        if(localdriver){
        this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(() => {
               return true
          })
          return true
        }
        else{
          return false;
        }

  }

  get isdriverApproved() {
    let localdriver = localStorage.getItem('driver')

    if (localdriver!=null) {
      let driver = JSON.parse(localdriver)
      if (driver.status === 'APPROVED') {
        return true;
      }
     
    }
      return  false;

  }



  istokenExpired(token:any){
    return this.http.post(environment.apiUrl+'/user/tokenexpired',token)
  }

  getname(){
    let user=localStorage.getItem('user') as any
    let driver=localStorage.getItem('driver') as any
    if(user ){
       return JSON.parse(user).username
    }
    else{
      if(driver){
        return JSON.parse(driver).drivername
      }
      return
    }
    
  }

  
}
