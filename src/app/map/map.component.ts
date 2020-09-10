import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  latitude = 16.240652812500006;
  longitude = 103.25703583333335;
  zoom = 18;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  

}
