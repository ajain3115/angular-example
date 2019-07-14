import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventBookingComponent } from './event-booking/event-booking.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'events-list'
  },
  {
    path:'events-list',
    component:EventsListComponent
  },
  {
    path:'book-event/:event_id',
    component:EventBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
