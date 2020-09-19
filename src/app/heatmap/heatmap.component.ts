import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

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
        let lati = data[index]['latitude'];
        let longi = data[index]['longitude'];
        let frequency = data[index]['frequency'];
        let rssi = data[index]['rssi'];
        let snr = data[index]['snr'];

        console.log(lati);
        console.log(longi);
        console.log(frequency);
        console.log(rssi);
        console.log(snr);
      }
    },error => {
      console.log(error);
    });
  }
  async onChoseLocation(event){
    let latitude = event.coords.lat;
    let longitude = event.coords.lng;

    let response = await this.http
      .get('http://202.28.34.197/LoRaTracker/meanLocation/'+JSON.stringify(latitude)+'/'+JSON.stringify(longitude)+'/'+JSON.stringify(0.00005)).toPromise();

    let mean_latitude = response[0]['latitude'];
    let mean_longitude = response[0]['longitude'];
    let mean_rssi = response[0]['rssi'];
    let mean_snr = response[0]['snr'];
    let mean_frequency = response[0]['frequency'];
    let mean_time = response[0]['time'];

    moment.locale('EN');    
    let date = moment(mean_time).format('L'), time= moment(mean_time).format('LTS');
    let Date_Time = date+" "+time;
    
    console.log(Date_Time);

    let info;
    let locals = {latitude : mean_latitude.toFixed(6), longitude : mean_longitude.toFixed(6), rssi : mean_rssi, snr : mean_snr,
                  frequency : mean_frequency, time : Date_Time};
    localStorage.setItem(info, JSON.stringify(locals));
    let item = JSON.parse(localStorage.getItem(info));
    console.log(item);
  }

  async onLoadHeatmap(){
    var gradient = [
      'rgba(0, 0, 0, 0)', // white
      'rgba(0, 255, 0, 255)', // green
      'rgba(255, 255, 0, 255)',  // yellow
      'rgba(255,0,0,1)', 
    ]
    let response = await this.http.get<[]>('http://202.28.34.197/LoRaTracker/SmartLocation/'+JSON.stringify(20)).toPromise();
    // console.log(response);

    let lati = Array();
    let longi = Array();
    let frequency = Array();
    let snr = Array();
    let rssi = Array();
    let LatLng = Array();
    
    for (let index = 0; index < response.length; index++) {
      lati.push(response[index]['latitude']);
      longi.push(response[index]['longitude']);
      frequency.push(response[index]['frequency']);
      rssi.push(response[index]['rssi']);
      snr.push(response[index]['snr']);

      // console.log(lati);
      // console.log(longi);
      // console.log(frequency);
      // console.log(rssi);
      // console.log(snr);
      // if(Math.abs(rssi) > 90){
      //   rssi = 30;
      // }else if(Math.abs(rssi) > 800){
      //   rssi = 40;
      // }else if(Math.abs(rssi) > 70){
      //   rssi = 50;
      // }else if(Math.abs(rssi) > 60){
      //   rssi = 60;
      // }else if(Math.abs(rssi) > 50){
      //   rssi = 70;
      // }else if(Math.abs(rssi) > 40){
      //   rssi = 10;
      // }else if(Math.abs(rssi) > 30){
      //   rssi = 90;
      // }else if(Math.abs(rssi) > 20){
      //   rssi = 100;
      // }else if(Math.abs(rssi) > 10){
      //   rssi = 110;
      // }else{
      //   rssi = 120;
      // }
      // console.log('rssi = ',rssi);
      // LatLng = [
      //   // {location: new google.maps.LatLng(lati, longi),weight:Math.abs(rssi)}
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
      // // console.log(LatLng);
      // this.heatmap = new google.maps.visualization.HeatmapLayer({
      //   map: this.map,
      //   data: LatLng
      // });
      // // console.log(this.heatmap);
      // this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
      // this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
      // this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.9);
      // this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true);
      // this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 0);
    }

    LatLng = [
      {location: new google.maps.LatLng(lati[0], longi[0]),weight:Math.abs(rssi[0])}, //มันเอาชุดข้อมูลตัวสุดท้ายไปใช้
    ];
    
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: LatLng
    });
    
    console.log(LatLng);
    console.log(this.heatmap);
    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
    this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.9);
    this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true);
    this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 0);
    console.log('success');
  }

  async onMapLoad(mapInstance:  google.maps.Map,LatLng) {
    this.map = mapInstance;
    this.map.setCenter(new google.maps.LatLng(16.240584, 103.2569)); //16.246261 103.252502

    let response = await this.http.get<[]>('http://202.28.34.197/LoRaTracker/SmartLocation/'+JSON.stringify(20)).toPromise();
    let lati = Array();
    let longi = Array();
    let frequency = Array();
    let snr = Array();
    let rssi = Array();
    let rssi_p = Array();

    for (let index in response) {
      lati.push(response[index]['latitude']);
      longi.push(response[index]['longitude']);
      frequency.push(response[index]['frequency']);
      rssi.push(response[index]['rssi']);
      rssi_p.push(response[index]['rssi_p']);
      snr.push(response[index]['snr']);

      console.log(response[index]['rssi_p']);
      LatLng = [
        {location: new google.maps.LatLng(response[index]['latitude'], response[index]['longitude']),weight:Math.abs(response[index]['rssi'])}, //มันเอาชุดข้อมูลตัวสุดท้ายไปใช้
      ];
      this.heatmap = new google.maps.visualization.HeatmapLayer({         
        map: this.map,
        data: LatLng
      });
      console.log('LatLng ',LatLng);
      console.log('heatmap ',this.heatmap);
      
      var gradient = [
        'rgba(0, 0, 0, 0)', // white
        'rgba(0, 255, 0, 255)', // green
        'rgba(255, 255, 0, 255)',  // yellow
        'rgba(255,0,0,1)', 
      ]
      this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient) // ไล่ระดับสี
      this.heatmap.set('radius', this.heatmap.get('radius') ? null : 25); // รัศมี
      this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 1); // ความทึบ
      this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true); // ทำให้กระจายตัว
      this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 80); // ความเข้มสูงสุด
    }

    // LatLng = [
    //   {location: new google.maps.LatLng(16.246261, 103.252502),weight:116},
    //   {location: new google.maps.LatLng(16.246202, 103.252502),weight:113},
    //   {location: new google.maps.LatLng(16.246030, 103.252380),weight:104},
    //   {location: new google.maps.LatLng(16.245822, 103.252243),weight:104},
    //   {location: new google.maps.LatLng(16.245708, 103.252334),weight:102},
    //   {location: new google.maps.LatLng(16.245536, 103.252510),weight:68},
    //   {location: new google.maps.LatLng(16.245416, 103.252685),weight:73},
    //   {location: new google.maps.LatLng(16.245252, 103.252937),weight:90},
    //   {location: new google.maps.LatLng(16.245145, 103.253074),weight:86},
    //   {location: new google.maps.LatLng(16.245019, 103.253219),weight:74},
    //   {location: new google.maps.LatLng(16.244956, 103.253379),weight:74},
    //   {location: new google.maps.LatLng(16.245132, 103.253433),weight:65}, 
    //   {location: new google.maps.LatLng(16.245328, 103.253486),weight:69},
    //   {location: new google.maps.LatLng(16.245596, 103.253486),weight:71},
    //   {location: new google.maps.LatLng(16.245859, 103.253433),weight:66},
    //   {location: new google.maps.LatLng(16.246112, 103.253395),weight:66},
    //   {location: new google.maps.LatLng(16.246335, 103.253356),weight:116},
    //   {location: new google.maps.LatLng(16.246583, 103.253242),weight:113},
    //   {location: new google.maps.LatLng(16.246805, 103.253067),weight:104},
    //   {location: new google.maps.LatLng(16.246660, 103.252876),weight:104},
    //   {location: new google.maps.LatLng(16.246471, 103.252754),weight:102},
    //   {location: new google.maps.LatLng(16.246397, 103.252677),weight:68},
    //   {location: new google.maps.LatLng(16.246467, 103.252540),weight:73},
    // ];
    
    
  }

}
