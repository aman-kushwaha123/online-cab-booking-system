import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  http=inject(HttpClient)

  pendingdrivers(){
    return this.http.get(environment.apiUrl+"/admin/drivers/pending");
  }

  acceptdrivers(id:number){
    return this.http.get(environment.apiUrl+"/admin/drivers/"+id+"/approve");

  }


  rejectdrivers(id:number){
     return this.http.delete(environment.apiUrl+"/admin/drivers/"+id+"/reject");
  }

  allUsers(){
    return this.http.get(environment.apiUrl+"/admin/allUsers");
  }

  allBookings(){
    return this.http.get(environment.apiUrl+"/admin/allBookings");
  }

 getdrivers(){
    return this.http.get(environment.apiUrl+"/admin/getDrivers");
  }

  getavailabledrivers(){
    return this.http.get(environment.apiUrl+"/admin/drivers/available");
  }

  removebooking(id:number){
    return this.http.delete(environment.apiUrl+"/admin/booking/remove/"+id);

  }

}
