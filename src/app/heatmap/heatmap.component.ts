import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  // 16.240584
  // 103.2569
  lat = 16.240652812500006;
  lng = 103.25703583333335;
  zoom = 18;
  latitude: any;
  longitude: any;
  location: any;
  
  alldata;
  lati;
  longi;
  frequency;
  rssi;
  snr;

  public map: google.maps.Map;
  public heatmap: google.maps.visualization.HeatmapLayer; 


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  BT_Test_Mean(){
    this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
    .subscribe(data => {

    },error => {
      console.log(error);
    });
  }
  async BT_Test_Location(){
    await this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
    .subscribe(data => {
      for (let index = 1; index < data.length; index++) {
        this.lati = data[index]['latitude'];
        this.longi = data[index]['longitude'];
        this.frequency = data[index]['frequency'];
        this.rssi = data[index]['rssi'];
        this.snr = data[index]['snr'];

        console.log(this.lati);
        console.log(this.longi);
        console.log(this.frequency);
        console.log(this.rssi);
        console.log(this.snr);
      }
    },error => {
      console.log(error);
    });
  }
  async onChoseLocation(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    // this.locationChosen = true;

    // console.log("latitude: "+this.latitude+", "+"longitude: "+this.longitude);
    await this.http.get('http://202.28.34.197/LoRaTracker/meanLocation/'+JSON.stringify(this.latitude)+'/'+JSON.stringify(this.longitude))
    .subscribe(data => {
      this.alldata = data ;
    },error => {
      this.alldata = error;
    });
    console.log(this.alldata);
  }
  async onTest(LatLng){
    var gradient = [
      'rgba(0, 0, 0, 0)', // white
      'rgba(0, 255, 0, 255)', // green
      'rgba(255, 255, 0, 255)',  // yellow
      'rgba(255,0,0,1)', 
    ]
    await this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
    .subscribe(data1 => {
      for (let index = 1; index < 10; index++) {
        let lati = data1[index]['latitude'];
        let longi = data1[index]['longitude'];
        let frequency = data1[index]['frequency'];
        let rssi = data1[index]['rssi'];
        let snr = data1[index]['snr'];

        // console.log(this.lati);
        // console.log(this.longi);
        // console.log(this.frequency);
        // console.log(this.rssi);
        // console.log(this.snr);
        if(Math.abs(rssi) > 90){
          this.rssi = 30;
        }else if(Math.abs(rssi) > 800){
          this.rssi = 40;
        }else if(Math.abs(rssi) > 70){
          this.rssi = 50;
        }else if(Math.abs(rssi) > 60){
          this.rssi = 60;
        }else if(Math.abs(rssi) > 50){
          this.rssi = 70;
        }else if(Math.abs(rssi) > 40){
          this.rssi = 10;
        }else if(Math.abs(rssi) > 30){
          this.rssi = 90;
        }else if(Math.abs(rssi) > 20){
          this.rssi = 100;
        }else if(Math.abs(rssi) > 10){
          this.rssi = 110;
        }else{
          this.rssi = 120;
        }
        console.log('rssi = ',rssi);
        LatLng = [
          {location: new google.maps.LatLng(lati, longi),weight:Math.abs(rssi)}
        ];
        // console.log(LatLng);
        this.heatmap = new google.maps.visualization.HeatmapLayer({
          map: this.map,
          data: LatLng
        });
        // console.log(this.heatmap);
        this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
        this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
        this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.9);
        this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true);
        this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 0);
      }
      console.log('success');
    },error => {
      console.log(error);
    });
    
  }

  async onMapLoad(mapInstance:  google.maps.Map,LatLng) {
    this.map = mapInstance;
    console.log(this.map);
    this.map.setCenter(new google.maps.LatLng(16.240584, 103.2569));
  }

}
