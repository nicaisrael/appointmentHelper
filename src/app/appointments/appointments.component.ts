import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "../appointment.service";
import { Observable } from "rxjs";
import {IAppointment} from '../appointment';
import {IUser} from '../user';
import { DataService } from "../shared-data.service";


@Component({
	selector: 'app-appointments',
	templateUrl: './appointments.component.html',
	styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
	title = 'Appointment Helper';
	private apiUrl = 'http://devtechtest.previewourapp.com/'
	appointments: Object;
	selectedAppointment: IAppointment;
	selectedUser: IUser;
	noteVisible: boolean = false;
	editVisible: boolean = false;
	newappointmentVisible: boolean;
	newParty: string = "";
	newNote: string = "";
	obsSelectedAppointments: IAppointment[] =[];
	selectedAppointments:  any;

	constructor(private appointmentService: AppointmentService, private data: DataService) {}
	onSelect(appointment: IAppointment): void {
		this.selectedAppointment = appointment;
	}


	openForm(): void{
		document.getElementById("myForm").style.display = "block";
	}

	closeForm(): void{
		document.getElementById("myForm").style.display = "none";
	}

createAppointment(): void { 
    let partyArray: number[] = "547,548".split(",").map(Number)
    let newAppointment: IAppointment = {
      Description: "Test6",//this.newDescription,
      Start: "2018-11-03T22:49:40.3252149+00:00",
      End: "2018-11-03T22:49:40.3252149+00:00",
      Notes: [],
      Party: partyArray,
      Id: 7,
      ProviderEmail: this.appointmentService.providerEmail
  };
  this.appointmentService.postCreateAppointment(newAppointment).subscribe(() => {

  });

}

addNote(): void {
    let notes: string[] = this.selectedAppointment.Notes;
    notes.push(this.newNote);
    this.selectedAppointment.Notes = notes;
    
    this.appointmentService
      .editUserAppointment(this.selectedAppointment)
      .subscribe(() => this.refresh());
    this.newNote = "";
  }

editAppointment(): void {
	let newAppointment: IAppointment = {
		Description: this.selectedAppointment.Description,
		Start: this.selectedAppointment.Start,
		End: this.selectedAppointment.End,
		Notes: this.selectedAppointment.Notes,
		Party: this.newParty.split(",").map(Number),
		Id: this.selectedAppointment.Id,
		ProviderEmail: this.selectedAppointment.ProviderEmail
	};
	this.appointmentService
      .editUserAppointment(newAppointment)
      .subscribe(() => {
        this.refresh();
      });
      this.closeForm();
	
}

refresh():void{
	this.appointmentService.getAllAppointments().subscribe(data => {
        	this.obsSelectedAppointments=[]
  			this.selectedAppointments = data;
  			for (let appointment of this.selectedAppointments){
  				this.obsSelectedAppointments.push(appointment);
  			}
  			console.log(this.obsSelectedAppointments)
  		this.data.loadAppointments(this.obsSelectedAppointments);
  	});
}

delete(appointmentId: number): void {
    this.appointmentService
      .deleteAppointment(appointmentId)
      .subscribe(() => this.refresh());
  }
ngOnInit() {
    this.data.appointments.subscribe(data => {this.appointments = data});

}

}
