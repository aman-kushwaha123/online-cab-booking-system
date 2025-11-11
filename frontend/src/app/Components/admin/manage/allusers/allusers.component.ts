import {Component, inject, ViewChild} from '@angular/core';
import {MatCell, MatCellDef, MatHeaderCellDef, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Driver } from '../../../../types/driver';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DriverService } from '../../../../services/driver.service';
import { BackbuttonService } from '../../../../services/backbutton.service';
import { AdminService } from '../../../../services/admin.service';


@Component({
  selector: 'app-allusers',
  standalone: true,
  imports: [MatFormFieldModule,MatCell,MatCellDef,MatHeaderCellDef,MatPaginatorModule,MatSortModule,MatHeaderCellDef,MatSortModule,MatTableModule,MatSortHeader,MatInputModule
      ,MatButtonModule],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.css'
})
export class AllusersComponent {
  displayedColumns: string[] = ['id', 'created_at', 'username', 'email','mobile_no','role','address'];
     dataSource: MatTableDataSource<any>;
       @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      driverService=inject(DriverService);
      adminService=inject(AdminService);
      router=inject(Router)
      isuserempty:boolean=false
      backbuttonService=inject(BackbuttonService)
  
  
      constructor() {
        // Create 100 users
  
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource([] as any) ;
  
  
      }
  
  
     users:any[]=[]
      ngOnInit(){
  
        this.adminService.allUsers().subscribe({
          next:(res:any)=>{
          
          this.users=res
          this.dataSource.data=this.users
          this.isuserempty=this.users.length===0
         
  
        
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

}
