import { Location } from '@angular/common';
import { inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackbuttonService {
  location=inject(Location)

  constructor() { }

  goback(){
     this.location.back();
  }
}
