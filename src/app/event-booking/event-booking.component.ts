import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
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
      
  }

  ngOnInit() {
    console.log('lselectedEvent',this.eventService.selectedEvent);
    this.selectedEvent = this.eventService.selectedEvent;
    if(!this.selectedEvent){
      this.router.navigate(['events-list'])
    }else{
      this.initForm();
    }
  }

  initForm(){
    this.bookingForm = this.fb.group({
      'userName': ['', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
      'email': ['', [Validators.required,Validators.email]],
      'phone': ['', [Validators.minLength(10),Validators.maxLength(10)]],
      'num_selected_seats': ['', [Validators.required,Validators.max(this.selectedEvent.seats_available)]],
      'otherUsers': this.fb.array([])
  });
  this.bookingForm.get('num_selected_seats').valueChanges.subscribe(res=>{
    this.addMoreUser(res)
  })
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
