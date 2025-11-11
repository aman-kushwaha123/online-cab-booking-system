import {Component, inject, ViewChild} from '@angular/core';
import {MatCell, MatCellDef, MatHeaderCellDef, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Driver } from '../../../../types/driver';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { DriverService } from '../../../../services/driver.service';
import { BackbuttonService } from '../../../../services/backbutton.service';
import { AdminService } from '../../../../services/admin.service';



@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [MatFormFieldModule,MatCell,MatCellDef,MatHeaderCellDef,MatPaginatorModule,MatSortModule,MatHeaderCellDef,MatSortModule,MatTableModule,MatSortHeader,MatInputModule
    ,MatButtonModule
  ],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent {
 displayedColumns: string[] = ['id', 'drivername', 'available', 'mobile_no','status','created_at','license_no','vehicle_no','vehicle_type'];
  dataSource: MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  driverService=inject(DriverService);
  adminService=inject(AdminService)
  backbuttonService=inject(BackbuttonService)

  constructor() {
    // Create 100 users
   
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as any) ;
    
  }

  ngOnInit(){
    this.adminService.getdrivers().subscribe((result:any)=>{
      console.log(result)
      this.dataSource.data=result
    })
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
}


