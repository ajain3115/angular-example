import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event-service.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  public allEvents = [];
  public tempallEvents = [];
  public searchControl:FormControl;
  constructor(private eventService: EventService, private router:Router) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((res:any)=>{
      this.allEvents = res.events;
      this.tempallEvents = this.allEvents.slice();
    })
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
    // .pipe(debounce())
    .subscribe(term => {
      console.log('term',term);
      this.searchEvent(term);
    });
  }

  searchEvent(key){
    if(key){
      this.allEvents = this.tempallEvents.filter(item=>{
        return item.name.toLowerCase().includes(key.toLowerCase());
      })
    }
    else{
      this.allEvents = this.tempallEvents.slice();
    }
  }

  bookNow(event,index){
    this.eventService.selectedEvent = event;
    this.router.navigate(['book-event',event.event_id])
  }

}
