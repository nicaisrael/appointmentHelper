import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { AppointmentService } from "./appointment.service";
import {IAppointment} from './appointment';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class DataService {

  //private messageSource = new BehaviorSubject(this.appointmentService.getAllAppointments());
  private _dataListSource: BehaviorSubject<IAppointment[]> = new BehaviorSubject([]);
  appointments: Observable<IAppointment[]> = this._dataListSource.asObservable()//.distinctUntilChanged();

  constructor(private appointmentService: AppointmentService) { }

  loadAppointments(selectedAppointments: IAppointment[]) {
  	this._dataListSource.next(selectedAppointments);

  

  }

}