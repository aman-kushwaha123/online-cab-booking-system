import {Component, inject, ViewChild} from '@angular/core';
import {MatCell, MatCellDef, MatHeaderCellDef, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import { DriverService } from '../../../../services/driver.service';
import { BackbuttonService } from '../../../../services/backbutton.service';
import { AdminService } from '../../../../services/admin.service';


@Component({
  selector: 'app-pendingdriver',
  standalone: true,
  imports: [MatFormFieldModule,MatCell,MatCellDef,MatHeaderCellDef,MatPaginatorModule,MatSortModule,MatHeaderCellDef,MatSortModule,MatTableModule,MatSortHeader,MatInputModule
    ,MatButtonModule],
  templateUrl: './pendingdriver.component.html',
  styleUrl: './pendingdriver.component.css'
})
export class PendingdriverComponent {
   displayedColumns: string[] = ['id', 'drivername', 'available', 'mobile_no','status','created_at','license_no','vehicle_no','action'];
   dataSource: MatTableDataSource<any>;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    driverService=inject(DriverService);
    adminService=inject(AdminService);
    router=inject(Router)
    ispendingsexists:boolean=false
    backbuttonService=inject(BackbuttonService)


    constructor() {
      // Create 100 users

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource([] as any) ;


    }


   pendingdrivers:any[]=[]
    ngOnInit(){

      this.adminService.pendingdrivers().subscribe({
        next:(res:any)=>{
         console.log(res)
        this.pendingdrivers=res
        this.dataSource.data=this.pendingdrivers
        console.log(this.pendingdrivers)
        this.ispendingsexists=this.pendingdrivers.length===0



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

    accept(id:number){
      this.adminService.acceptdrivers(id).subscribe((result:any)=>{
       
        this.pendingdrivers=this.pendingdrivers.filter(d =>d.id !== id);
        this.dataSource.data=this.pendingdrivers

      })

    }

    reject(id:number){

        this.adminService.rejectdrivers(id).subscribe((result:any)=>{
          this.pendingdrivers=this.pendingdrivers.filter(d =>d.id !== id);
         this.dataSource.data=this.pendingdrivers

        })

    }



}
