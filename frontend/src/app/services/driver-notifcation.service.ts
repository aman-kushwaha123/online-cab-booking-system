(window as any).global = window;
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { client } from 'stompjs';
import * as Stomp from 'stompjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DriverNotifcationService {
  private http=inject(HttpClient)
  private StompClient: any;
  private subject = new Subject<any>();
  

  constructor() { }

  connect() {
    
    //SockJS handles WebSocket fallback and compatibility.
    //Creates a new SockJS connection to the server at http://localhost:8094/ws.
    const socket = new SockJS('http://localhost:8094/ws');
    /*Wraps the SockJS connection with the STOMP protocol.
    STOMP is a messaging protocol on top of WebSockets that supports subscribe/publish behavior.
    this.StompClient will now be used to send and receive messages.*/
    this.StompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    // Initiates the actual WebSocket connection using the STOMP client.
    // The first parameter {} is for connection headers (empty here).
    // The second parameter is a callback function that is triggered
    //  when a message is received from the server (subscription must be configured elsewhere).
    this.StompClient.onConnect=(frame:any) => {
       
      console.log("Connected to the server")
      this.StompClient.subscribe("/topic/drivers", (message: any) => {
        this.subject.next(JSON.parse(message.body));
      })
      //Parses the incoming message (usually JSON format).
      // Pushes it into the Subject, making it available to any subscribers (other components).

    };

    this.StompClient.activate()
    

  };

 


  


  //this.subject
  //Acts as both an `Observable` (you can subscribe to it)
  //- And an `Observer` (you can push data into it using `.next()`)

  //asObservable()` converts it into a **read-only Observable**:
  // - ✅ Components **can subscribe** to it.
  //  - ❌ But they **cannot emit** new values into it (they don’t get access to `.next()`).
  getNotification(): Observable<any> {
    return this.subject.asObservable();   //Others can only subscribe
  }

   accept(driver:any,id:number){
    return this.http.post(environment.apiUrl+'/booking/accept/'+id,driver)
  }

  

}


