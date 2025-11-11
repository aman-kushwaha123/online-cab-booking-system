import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   private dialogResultSource = new BehaviorSubject<any>(null);
  
  dialogResult$ = this.dialogResultSource.asObservable();
 

  setDialogResult(data: any) {
    this.dialogResultSource.next(data);
  }

 



  constructor() { }
}
