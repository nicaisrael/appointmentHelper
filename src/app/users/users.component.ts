import { Component, OnInit, EventEmitter,HostListener ,  Output } from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {IAppointment} from '../appointment';
import { AppointmentsComponent } from "../appointments/appointments.component";
import {IUser} from '../user';
import { AppointmentService } from "../appointment.service";
import { UserService } from "../user.service";
import { DataService } from "../shared-data.service";


@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	providerEmail = 'nica_israel@yahoo.com'
	private apiUrl = 'http://devtechtest.previewourapp.com/'
	users: Object;
	selectedUser: Object
	userName: string;
	userId: number
	selectedAppointments:  any;
	tempSelectedAppointments: Observable<IAppointment>[]
	obsSelectedAppointments: IAppointment[] =[]
	appointments: Object;

	constructor(private userService: UserService, private data: DataService, private appointmentService: AppointmentService) {}


	saveUser(): void{
		this.obsSelectedAppointments=[];
  	if (typeof this.userId === 'undefined'){

  	}else if (Number(this.userId) === 0 ){
  		this.refresh();
  	}
  		else{
  			this.tempSelectedAppointments=this.appointmentService.getUserAppointments(this.userId);
  			for (let appointment of this.tempSelectedAppointments){
  				appointment.subscribe(data => {
  					let newAppointment: IAppointment = {
  						Description: data.Description,
  						Start: data.Start,
  						End:data.End,
  						Notes: data.Notes,
  						Party: data.Party,
  						Id: data.Id,
  						ProviderEmail: data.ProviderEmail
  					};this.obsSelectedAppointments.push(newAppointment);
  				})
  			}
  			this.data.loadAppointments(this.obsSelectedAppointments);
  		}
  	}

refresh():void{
  this.appointmentService.getAllAppointments().subscribe(data => {
          this.obsSelectedAppointments=[]
        this.selectedAppointments = data;
        for (let appointment of this.selectedAppointments){
          this.obsSelectedAppointments.push(appointment);
        }
      this.data.loadAppointments(this.obsSelectedAppointments);
    });
}
  	ngOnInit() {
  		this.userService.getAllUsers().subscribe(data => (this.users = data));
      this.userId = 0;
  		this.saveUser();

  }

}
