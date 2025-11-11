
import { Component,inject,Optional } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef,MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatButtonToggleModule,MatButtonToggleGroup} from '@angular/material/button-toggle'
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule,MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule, NgxTimepickerFieldComponent } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatFormField,MatInput,MatCard,MatButtonToggleModule,MatButtonToggleGroup,FormsModule,MatDatepickerModule,MatLabel,
    MatNativeDateModule,MatSuffix,MatIconModule,NgxMaterialTimepickerModule,MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  matdata:any=inject(MAT_DIALOG_DATA);
  dialogRef:any=inject(MatDialogRef<DialogComponent>, { optional: true });
  selectedOption: 'pickup' | 'dropoff' = 'pickup';
 
  selectedDate: Date | null = null;
  selectedTime='00:00';

  pickupData:{date:any,time:any} = { date: null ,time:'00:00'};
  dropoffData:{date:any,time:any} = { date: null,time:'00:00'};
  
  onToggleChange() {
  if (this.selectedOption === 'pickup') {
    
    this.dropoffData.date = this.selectedDate;
    this.dropoffData.time = this.selectedTime;

    this.selectedDate = this.pickupData.date;
    this.selectedTime = this.pickupData.time;

    
    
    // Load pickup date
  } 
  else{
    this.pickupData.date = this.selectedDate;
    this.pickupData.time = this.selectedTime;

    this.selectedDate = this.dropoffData.date;
    this.selectedTime = this.dropoffData.time;


    
  }
}

  closedialog(){
    if (this.selectedOption === 'pickup') {
    this.pickupData.date = this.selectedDate;
    this.pickupData.time = this.selectedTime;
  } else {
    this.dropoffData.date = this.selectedDate;
    this.dropoffData.time = this.selectedTime;
  }
     
      let pickupdata={pickupdate:this.pickupData.date?.toDateString(),pickuptime:this.pickupData.time}
      let dropoffdata={dropoffdate:this.dropoffData.date?.toDateString(),dropofftime:this.dropoffData.time}
      if(pickupdata && dropoffdata){
       
         this.dialogRef.close({pickupdata,dropoffdata})
      }
      else{
       return;
      }
      
  }

  canceldialog(){
    this.dialogRef.close("Cancelled")
    
  }

  
  
}


