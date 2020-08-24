import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat = 16.240652812500006;
  lng = 103.25703583333335;
  zoom = 18;
  
  constructor() { }

  ngOnInit() {
  }

}
