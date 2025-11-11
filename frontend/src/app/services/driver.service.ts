import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Driver } from '../types/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  //this.isDriver = parsedUser.roles.includes('DRIVER');
  constructor() { }

  http=inject(HttpClient);

  registerdriver(driver:Driver){
    return this.http.post(environment.apiUrl+'/driver/register',driver);
  }

  logindriver(drivername:String,password:String){
    return this.http.post(environment.apiUrl+'/driver/login',{
      drivername,
      password
    });
  }

  

  updateAvailability(id:Number,available:boolean){
    return this.http.patch(environment.apiUrl+"/driver/"+id+"/availability?available="+available,{})
  }


}
