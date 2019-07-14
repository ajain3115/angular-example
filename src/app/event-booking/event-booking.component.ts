import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.scss']
})
export class EventBookingComponent implements OnInit {
  public selectedEvent = null;
  public bookingForm:FormGroup;
  constructor(private eventService:EventService, private router:Router,
    private fb: FormBuilder) {
      this.bookingForm = fb.group({
        'userName': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required])],
        'num_selected_seats': ['', Validators.compose([Validators.required])],
        'otherUsers': fb.array([])
    });
    this.bookingForm.get('num_selected_seats').valueChanges.subscribe(res=>{
      this.addMoreUser(res)
    })
  }

  ngOnInit() {
    console.log('lselectedEvent',this.eventService.selectedEvent);
    this.selectedEvent = this.eventService.selectedEvent;
    if(!this.selectedEvent){
      this.router.navigate(['events-list'])
    }
  }

  addMoreUser(count) {
    // (<FormArray>this.bookingForm.get('otherUsers')) = this.fb.array([])
    this.bookingForm.removeControl('otherUsers');
    this.bookingForm.addControl('otherUsers',this.fb.array([]))
    for (let index = 1; index < count; index++) {
      (<FormArray>this.bookingForm.get('otherUsers')).push( this.fb.control('',Validators.required));
    }
  }

  onSubmit(values){
    console.log('this.form',this.bookingForm,values);
    
  }

}
