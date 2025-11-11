import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BackbuttonService } from '../../services/backbutton.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any
  backbuttonService=inject(BackbuttonService)

  ngOnInit(){
    let result1=localStorage.getItem("user") as any
    this.user=JSON.parse(result1)
    

  }

}
