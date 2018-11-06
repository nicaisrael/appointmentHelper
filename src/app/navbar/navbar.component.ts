import { Component, OnInit, EventEmitter  } from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';
import {IAppointment} from '../appointment';
import {IUser} from '../user';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Object;
  users: Object;
  constructor (private http: HttpClient) { 

  }

    

  ngOnInit() {

  }

}
