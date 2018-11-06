import { Component, EventEmitter,HostListener ,  Output } from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';
import {IAppointment} from './appointment';
import { AppointmentsComponent } from "./appointments/appointments.component";
import {IUser} from './user';


@Injectable({
  providedIn: "root"
})


export class UserService {
  providerEmail = 'nica_israel@yahoo.com'
  private apiUrl = 'http://devtechtest.previewourapp.com/'
  users: Object;
  selectedUser: Object
  userName: string;
  userId: number
  constructor (private http: HttpClient) { }
  getAllUsers(): Observable<IUser[]>{
    //console.log(this.http.get(this.apiUrl + 'api/User?providerEmail=' + this.providerEmail).pipe(
    //.map((res: Response) => res.json()))
    return this.http.get<IUser[]>(this.apiUrl + 'api/User?providerEmail=' + this.providerEmail);
    
  }

  getAppointment(appointmentId: number): Observable<IAppointment> {
	return this.http.get<IAppointment>(this.apiUrl + 'api/Appointment/' + appointmentId + '?providerEmail=' + this.providerEmail);
  }

  @Output() refreshAppointments: EventEmitter<null> = new EventEmitter();

  @HostListener('saveUser')

  saveUser(): void{
  	console.log(this.userId);
  	this.getAppointment(this.userId);
  	this.refreshAppointments.emit();
  }


}
