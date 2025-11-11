import { Component ,inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BackbuttonService } from '../../services/backbutton.service';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css'
})
export class DriverProfileComponent {
  driver:any
  backbuttonService=inject(BackbuttonService)

  ngOnInit(){  
    let result=localStorage.getItem('driver') as any
    this.driver=JSON.parse(result)
    
  }

}
