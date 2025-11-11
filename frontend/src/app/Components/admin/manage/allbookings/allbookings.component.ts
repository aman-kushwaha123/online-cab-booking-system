import {Component, inject, ViewChild} from '@angular/core';
import {MatCell, MatCellDef, MatHeaderCellDef, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DriverService } from '../../../../services/driver.service';
import { AdminService } from '../../../../services/admin.service';
import { BackbuttonService } from '../../../../services/backbutton.service';


@Component({
  selector: 'app-allbookings',
  standalone: true,
  imports: [MatFormFieldModule,MatCell,MatCellDef,MatHeaderCellDef,MatPaginatorModule,MatSortModule,MatHeaderCellDef,MatSortModule,MatTableModule,MatSortHeader,MatInputModule
    ,MatButtonModule],
  templateUrl: './allbookings.component.html',
  styleUrl: './allbookings.component.css'
})
export class AllbookingsComponent {
  displayedColumns: string[] = ['id', 'droplocation','booking_date_time','pickuplocation','status','driverid','userid','price','ride','pickup_date_time','dropoff_date_time','action'];
     dataSource: MatTableDataSource<any>;
       @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      driverService=inject(DriverService);
      adminService=inject(AdminService);
      router=inject(Router)
      isbookingsempty:boolean=false
      backbuttonService=inject(BackbuttonService)


      constructor() {
        // Create 100 users

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource([] as any) ;


      }


     bookings:any[]=[]
      ngOnInit(){

        this.adminService.allBookings().subscribe({
          next:(res:any)=>{

          this.bookings=res
          this.dataSource.data=this.bookings

          this.isbookingsempty=this.bookings.length===0
       },
        error:(err)=>{
          console.log("error",err)

        }

        }
        )

      }

      ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      remove(id:number){
        this.adminService.removebooking(id).subscribe((result:any)=>{
          this.bookings = this.bookings.filter((booking: any) => booking.id !== id);
          this.dataSource.data=this.bookings
          console.log("Booking Removed");
        })
      }

}
