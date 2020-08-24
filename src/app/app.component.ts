import { Component } from '@angular/core';
import {} from 'googlemaps';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 16.240584
  // 103.2569
  // lat: number = 16.240652812500006;
  // lng: number = 103.25703583333335;

  // latitude: any;
  // longitude: any;
  // location: any;
  // zoom = 18;
  // alldata;
  // lati;
  // longi;
  // frequency;
  // rssi;
  // snr;

  // public map: google.maps.Map;
  // public heatmap: google.maps.visualization.HeatmapLayer; 

  // constructor(private http: HttpClient) { }

  // BT_Test_Mean(){
  //   this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
  //   .subscribe(data => {

  //   },error => {
  //     console.log(error);
  //   });
  // }
  // async BT_Test_Location(){
  //   await this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
  //   .subscribe(data => {
  //     for (let index = 1; index < data.length; index++) {
  //       this.lati = data[index]['latitude'];
  //       this.longi = data[index]['longitude'];
  //       this.frequency = data[index]['frequency'];
  //       this.rssi = data[index]['rssi'];
  //       this.snr = data[index]['snr'];

  //       console.log(this.lati);
  //       console.log(this.longi);
  //       console.log(this.frequency);
  //       console.log(this.rssi);
  //       console.log(this.snr);
  //     }
  //   },error => {
  //     console.log(error);
  //   });
  // }
  // async onChoseLocation(event){
  //   this.latitude = event.coords.lat;
  //   this.longitude = event.coords.lng;
  //   // this.locationChosen = true;

  //   // console.log("latitude: "+this.latitude+", "+"longitude: "+this.longitude);
  //   await this.http.get('http://202.28.34.197/LoRaTracker/meanLocation/'+JSON.stringify(this.latitude)+'/'+JSON.stringify(this.longitude))
  //   .subscribe(data => {
  //     this.alldata = data ;
  //   },error => {
  //     this.alldata = error;
  //   });
  //   console.log(this.alldata);
  // }
  // async onTest(LatLng){
  //   var gradient = [
  //     'rgba(0, 0, 0, 0)', // white
  //     'rgba(0, 255, 0, 255)', // green
  //     'rgba(255, 255, 0, 255)',  // yellow
  //     'rgba(255,0,0,1)', 
  //   ]
  //   await this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
  //   .subscribe(data1 => {
  //     for (let index = 1; index < 10; index++) {
  //       this.lati = data1[index]['latitude'];
  //       this.longi = data1[index]['longitude'];
  //       this.frequency = data1[index]['frequency'];
  //       this.rssi = data1[index]['rssi'];
  //       this.snr = data1[index]['snr'];

  //       // console.log(this.lati);
  //       // console.log(this.longi);
  //       // console.log(this.frequency);
  //       // console.log(this.rssi);
  //       // console.log(this.snr);
  //       if(Math.abs(this.rssi) > 90){
  //         this.rssi = 30;
  //       }else if(Math.abs(this.rssi) > 800){
  //         this.rssi = 40;
  //       }else if(Math.abs(this.rssi) > 70){
  //         this.rssi = 50;
  //       }else if(Math.abs(this.rssi) > 60){
  //         this.rssi = 60;
  //       }else if(Math.abs(this.rssi) > 50){
  //         this.rssi = 70;
  //       }else if(Math.abs(this.rssi) > 40){
  //         this.rssi = 10;
  //       }else if(Math.abs(this.rssi) > 30){
  //         this.rssi = 90;
  //       }else if(Math.abs(this.rssi) > 20){
  //         this.rssi = 100;
  //       }else if(Math.abs(this.rssi) > 10){
  //         this.rssi = 110;
  //       }else{
  //         this.rssi = 120;
  //       }
  //       console.log('rssi = ',this.rssi);
  //       LatLng = [
  //         {location: new google.maps.LatLng(this.lati, this.longi),weight:Math.abs(this.rssi)}
  //       ];
  //       console.log(LatLng);
  //       this.heatmap = new google.maps.visualization.HeatmapLayer({
  //         map: this.map,
  //         data: LatLng
  //       });
  //       // console.log(this.heatmap);
  //       this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
  //       this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
  //       this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.9);
  //       this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true);
  //       this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 0);
  //     }
  //     console.log('success');
  //   },error => {
  //     console.log(error);
  //   });
    
  // }

  // async onMapLoad(mapInstance:  google.maps.Map,LatLng) {
  //   this.map = mapInstance;
  //   console.log(this.map);
  //   this.map.setCenter(new google.maps.LatLng(16.240584, 103.2569));
  // }
}

  // LatLng = [
  //   {location: new google.maps.LatLng(16.246261, 103.252502),weight:76}, // Fac   1 -76
  //   {location: new google.maps.LatLng(16.246202, 103.252502),weight:67}, // Road  2 -85
  //   {location: new google.maps.LatLng(16.246030, 103.252380),weight:69}, // Road  3 -83
  //   {location: new google.maps.LatLng(16.245822, 103.252243),weight:65}, // Road  4 -87
  //   {location: new google.maps.LatLng(16.245708, 103.252334),weight:64}, // Road  5 -88
  //   {location: new google.maps.LatLng(16.245536, 103.252510),weight:63}, // Silk  6 -89
  //   {location: new google.maps.LatLng(16.245416, 103.252685),weight:55}, // Road  7 -97 
  //   {location: new google.maps.LatLng(16.245252, 103.252937),weight:73}, // Road  8 -79
  //   {location: new google.maps.LatLng(16.245145, 103.253074),weight:55}, // Road  9 -97
  //   {location: new google.maps.LatLng(16.245019, 103.253219),weight:58}, // Road  10 -94 
  //   {location: new google.maps.LatLng(16.244956, 103.253379),weight:65}, // Road  11 -81
  //   {location: new google.maps.LatLng(16.245132, 103.253433),weight:63}, // Road  12 -89  
  //   {location: new google.maps.LatLng(16.245328, 103.253486),weight:78}, // Road  13 -74
  //   {location: new google.maps.LatLng(16.245596, 103.253486),weight:77}, // Road  14 -77
  //   {location: new google.maps.LatLng(16.245859, 103.253433),weight:79}, // Road  15 -73
  //   {location: new google.maps.LatLng(16.246112, 103.253395),weight:82}, // Road  16 -70
  //   {location: new google.maps.LatLng(16.246335, 103.253356),weight:67}, // Road  17 -85
  //   {location: new google.maps.LatLng(16.246583, 103.253242),weight:73}, // Road  18 -79
  //   {location: new google.maps.LatLng(16.246805, 103.253067),weight:72}, // Road  19 -80
  //   {location: new google.maps.LatLng(16.246660, 103.252876),weight:76}, // Road  20 -76
  //   {location: new google.maps.LatLng(16.246471, 103.252754),weight:81}, // Road  21 -71
  //   {location: new google.maps.LatLng(16.246397, 103.252677),weight:64}, // Road  22 -88
  //   {location: new google.maps.LatLng(16.246467, 103.252540),weight:71}, // Road  23 -81
  // ];
  // this.heatmap = new google.maps.visualization.HeatmapLayer({         
  //     map: this.map,
  //     data: LatLng
  // });
  // https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/layer-heatmap
  // var gradient = [
  //   'rgba(0, 0, 0, 0)', // white
  //   'rgba(0, 255, 0, 255)', // green
  //   'rgba(255, 255, 0, 255)',  // yellow
  //   'rgba(255,0,0,1)', 
  // ]
  // console.log('LatLng ',LatLng);
  // this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
  // this.heatmap.set('radius', this.heatmap.get('radius') ? null : 50);
  // this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.9);
  // this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true);
  // this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 0);