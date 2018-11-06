import { Component,OnInit } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {map} from 'rxjs/operators';
import { AppointmentsComponent } from "./appointments/appointments.component";
import { UsersComponent } from "./users/users.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  onMain: Boolean;
  title = 'Appointment Helper';
  appointments: Object;



    ngOnInit() {

  }
}

