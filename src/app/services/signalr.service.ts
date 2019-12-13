import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private message$: Subject<any>;
  private connection: signalR.HubConnection;

  constructor() {
    this.message$ = new Subject<any>();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/notify`)
      .build();
      this.connect();
  }

  private connect() {
    this.connection.start()
    .catch(err => console.log(err));

    this.connection.on('BroadcastMessage', (message) => {
      this.message$.next(message);
    });
  }

  public getMessage(): Observable<any> {
    return this.message$.asObservable();
  }
  public disconnect() {
    this.connection.stop();
  }
}
