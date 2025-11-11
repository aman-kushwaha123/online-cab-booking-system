import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Component, EventEmitter, inject, Input, Optional, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BookingService } from '../../../services/booking.service';
import { Booking } from '../../../types/booking';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-chooseride',
  standalone: true,
  imports: [FormsModule, MatCardModule, FormsModule, MatIcon, NgClass, MatCardContent, NgIf, NgFor],
  templateUrl: './chooseride.component.html',
  styleUrl: './chooseride.component.css'
})
export class ChooserideComponent {
  dialog=inject(MatDialog)
  sharedService=inject(SharedService)
  router=inject(Router)
  toastrService=inject(ToastrService)
  bookingService=inject(BookingService)
  pickup_date_time:any
  dropoff_date_time:any


  price:String=''
  ride:String=''


  @Input() droplocation:String=''
  @Input() pickuplocation:String=''

  constructor() { }

  ngOnInit() {

  }


  vehicleTypes = [
    {
      name: 'Auto Rickshaw',
      img: 'https://m.media-amazon.com/images/I/51fwdvLXtTL._SL1000_.jpg',
      description: 'The classic three-wheeler for quick city rides.',
      price: '₹5.00'
    },
    {
      name: 'Bike',
      img: 'https://tse3.mm.bing.net/th/id/OIP.JfHUw02-bRSW1gxu2MzBdAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      description: 'The fastest way to beat traffic as a single rider.',
      price: '₹12.00'
    },
    {
      name: 'Cab',
      description: 'A fast, two-wheeled ride perfect for one person to zip through traffic and save money on short trips',
      img: 'https://img.freepik.com/premium-vector/three-dimensional-image-taxi-car-isolated-white-background_53876-12109.jpg?w=360',
      price: '₹25.00'
    },
    {
      name: 'Scooter',
      description: ' A fast, two-wheeled ride perfect for one person to zip through traffic and save money on short trips.',
      img: 'https://img.freepik.com/premium-photo/scooter-with-white-background-high-quality-ultra-hd_889056-9985.jpg',
      price: '₹3.50'
    }
  ];


   selectedVehicle: any = null;
   
  





  selectVehicle(vehicle: any): void {
    this.selectedVehicle = vehicle;
    
    this.price=this.selectedVehicle.price;
    this.ride=this.selectedVehicle.name;
     this.sharedService.dialogResult$.subscribe(data => {
      if(data && data.pickupdata && data.dropoffdata){
      this.pickup_date_time=data.pickupdata.pickupdate+' '+data.pickupdata.pickuptime
      this.dropoff_date_time=data.dropoffdata.dropoffdate+' '+data.dropoffdata.dropofftime
      
      }else{
        this.toastrService.error('Please Select Pickup and DropOff Date and Time','Error')
      }
      
      
  });


  }

  book(){
    let user=localStorage.getItem("user") as any
    let values:any={
      pickupLocation:this.pickuplocation,
      dropLocation:this.droplocation,
      user:JSON.parse(user),
      ride:this.ride,
      price:this.price,
      pickup_date_time:this.pickup_date_time,
      dropoff_date_time:this.dropoff_date_time
    }


    this.bookingService.book(values).subscribe({
      next:(res)=>{
        this.router.navigateByUrl("/bookings")
        this.toastrService.success("Booking Successfull ","success")
        

      },
      error:(res)=>{
        
        this.toastrService.error("You Might Not Be User.Plz login for user","error")
      }

    })








  }



}


