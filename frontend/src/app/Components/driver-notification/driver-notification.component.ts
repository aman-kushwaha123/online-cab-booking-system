import { Component, inject } from '@angular/core';
import { DriverNotifcationService } from '../../services/driver-notifcation.service';
import { HttpClient } from '@angular/common/http';
import { NgClass, NgFor, NgIf ,DatePipe} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Booking } from '../../types/booking';
import { BookingService } from '../../services/booking.service';
import { BackbuttonService } from '../../services/backbutton.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-driver-notification',
  standalone: true,
  imports: [NgFor, MatCardModule, NgClass, NgIf,MatButtonModule,DatePipe],
  templateUrl: './driver-notification.component.html',
  styleUrl: './driver-notification.component.css'
})
export class DriverNotificationComponent {

  bookings: any[] = []
  driverNotificationService = inject(DriverNotifcationService);
  bookingService=inject(BookingService);
  backbuttonService=inject(BackbuttonService)
  
  http = inject(HttpClient);
  

  ngOnInit() {
    const savedbookings=localStorage.getItem("bookings")
     if(savedbookings){
      this.bookings=JSON.parse(savedbookings)
    }
    this.bookingService.getPendingBookings().subscribe((result:any)=>{
      for(const booking of result){
        this.bookings.push(booking);

      }
      if (this.bookings.length > 10) {
      this.bookings.shift(); // Drop the oldest
    }
    })

    this.driverNotificationService.connect();
      this.driverNotificationService.getNotification().subscribe(booking => {
      this.bookings.push(booking);
      if (this.bookings.length > 10) {
      this.bookings.shift(); // Drop the oldest
    }
     
    })

    localStorage.setItem("bookings",JSON.stringify(this.bookings))//updatedbookings
   

  }

  accept(bookingId: number) {
    const driver = localStorage.getItem("driver") as any
    this.driverNotificationService.accept(JSON.parse(driver),bookingId).subscribe((result) => {
      this.bookings = this.bookings.filter(b => b.id !== bookingId);
    });

  }






}
