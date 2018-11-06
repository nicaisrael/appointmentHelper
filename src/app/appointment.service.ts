import { Component, EventEmitter } from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {IAppointment} from './appointment';
import {IUser} from './user';
import { Observable, empty, of } from 'rxjs';
import {Parties} from './parties';




@Injectable({
  providedIn: "root"
})

export class AppointmentService {
  title = 'Appointment Helper';
  private apiUrl = 'http://devtechtest.previewourapp.com/'
  //appointments = Observable<IAppointment>;
  appointments: Object;
  selectedAppointment: IAppointment;
  selectedUser: IUser;
  userAppointments:Observable<IAppointment>[] = [];
  resultAppointments: IAppointment[] = [];
  party: Parties;


  constructor (private http: HttpClient) {
  	
  }
  providerEmail = 'nica_israel@yahoo.com'

    getUser(userId:number): Observable<IUser>{
    return this.http.get<IUser>(this.apiUrl + 'api/User/' + userId +'?providerEmail=' + this.providerEmail);
   
  }
  getAppointment(appointmentId: number): Observable<IAppointment> {
    return this.http.get<IAppointment>(this.apiUrl + 'api/Appointment/' + appointmentId + '?providerEmail=' + this.providerEmail);

  }

  getAllAppointments() : Observable<IAppointment[]> { 
    return this.http.get<IAppointment[]>(this.apiUrl + 'api/Appointment?providerEmail=' + this.providerEmail);
  }

  getUserAppointments(userId: number): Observable<IAppointment>[] {
   this.userAppointments = [];
   var newPartyArray = new Array();
   var resultsArray = new Array();
   this.getAllAppointments();
   this.getAllAppointments().subscribe(data => {
   	this.resultAppointments = data;
   });

   for (let item of this.resultAppointments){
   	let newParty: Parties = {
 		Id: item.Id,
 		Party: item.Party
 	}
 	if(newParty.Party.includes(userId)){
 		newPartyArray.push(newParty);

 	}
   	

}
   for (let item of newPartyArray){
   	this.userAppointments.push(this.getAppointment(item.Id));
   }
   return this.userAppointments;
  }
 
  editUserAppointment(appointment: IAppointment): Observable<any>{
  	let newAppointment: IAppointment = {
      Description: appointment.Description,
      Start: appointment.Start,
      End: appointment.End,
      Notes: appointment.Notes,
      Party: appointment.Party , //newPartyString2.split(",").map(Number)
      Id: appointment.Id,
      ProviderEmail: appointment.ProviderEmail};
    return this.http.put(this.apiUrl +'api/Appointment/'+ appointment.Id + '?providerEmail=' + this.providerEmail, newAppointment);
  }

  postCreateAppointment(appointment: IAppointment): Observable<IAppointment> {
  	console.log("POST")
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<IAppointment>(
      this.apiUrl + "api/Appointment?providerEmail="+ this.providerEmail,
      appointment,
      httpOptions
    );
  }

  deleteAppointment(appointmentId: number) {
    return this.http.delete( this.apiUrl+ '/api/Appointment/' + appointmentId + '?providerEmail=' + this.providerEmail);
  }




}
