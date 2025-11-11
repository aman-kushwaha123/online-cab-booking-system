import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Booking } from '../types/booking';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  http=inject(HttpClient)

  constructor() { }

  book(booking:any){
    return this.http.post(environment.apiUrl+'/booking/book',booking)

  }
  
  getPendingBookings(){
    return this.http.get(environment.apiUrl+'/booking/pending')
  }

  getBookings(id:any){
    return this.http.get(environment.apiUrl+'/booking/allbookings/'+id);
  }
 
}
