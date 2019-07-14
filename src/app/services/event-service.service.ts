import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public selectedEvent = null;
  constructor(private http:HttpClient) {
  }
  getEvents(){
    return this.http.get('assets/events.json');
  }
}
