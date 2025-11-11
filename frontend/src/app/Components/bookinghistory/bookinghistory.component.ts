import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BookingService } from '../../services/booking.service';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { BackbuttonService } from '../../services/backbutton.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bookinghistory',
  standalone: true,
  imports: [MatCardModule,NgClass,NgFor,MatButtonModule,DatePipe],
  templateUrl: './bookinghistory.component.html',
  styleUrl: './bookinghistory.component.css'
})
export class BookinghistoryComponent { 
  bookinService=inject(BookingService)
  bookings:any
  backbuttonService=inject(BackbuttonService)

  ngOnInit(){
    let user=localStorage.getItem('user')
   
    if(user){
      let id=JSON.parse(user).id
      
      this.bookinService.getBookings(id).subscribe((result:any)=>{
      
      this.bookings=result;
      console.log(this.bookings)
    })
    }
    
  }


}
