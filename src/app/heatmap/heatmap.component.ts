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
  make_lat;
  make_long;

  mean_latitude;
  mean_longitude;
  mean_rssi;
  mean_snr;


  public map: google.maps.Map;
  public heatmap: google.maps.visualization.HeatmapLayer; 


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  async onChoseLocation(event){
    let latitude = event.coords.lat;
    let longitude = event.coords.lng;
    

    let response = await this.http
      .get('http://202.28.34.197/LoRaTracker/meanLocation/'+JSON.stringify(latitude)+'/'+JSON.stringify(longitude)+'/'+JSON.stringify(0.00005)).toPromise();

    if(response){
      this.make_lat = latitude;
      this.make_long =longitude;
      var mean_latitude = response[0]['latitude'];
      let mean_longitude = response[0]['longitude'];
      let mean_rssi = response[0]['rssi'];
      let mean_snr = response[0]['snr'];
      let mean_frequency = response[0]['frequency'];
      let mean_time = response[0]['time'];

      moment.locale('EN');    
      let date = moment(mean_time).format('L'), time= moment(mean_time).format('LTS');
      let Date_Time = date+" "+time;

      let info;
      let locals = {latitude : mean_latitude.toFixed(6), longitude : mean_longitude.toFixed(6), rssi : mean_rssi, snr : mean_snr,
                    frequency : mean_frequency, time : Date_Time};
      localStorage.setItem(info, JSON.stringify(locals)); // เก็บข้อมูลในตัวแปล locals ลงในsession
      
      let item = JSON.parse(localStorage.getItem(info)); // เก็บข้อมูลใน session ลงในตัวแปล item
      this.mean_latitude = item.latitude;
      this.mean_longitude = item.longitude;
      this.mean_rssi = item.rssi;
      this.mean_snr = item.snr;
    }
  }


  zoomChange(z){
    this.zoom = z;
    if(this.zoom > 15){
      this.heatmap.set('radius', this.heatmap.get('radius') ? null : this.zoom+5); // รัศมี
    }else{
      this.heatmap.set('radius', this.heatmap.get('radius') ? null : this.zoom-5); // รัศมี
    }
    // console.log('heatmap ',this.heatmap);
    // console.log(z);
  }
  async onMapLoad(mapInstance:  google.maps.Map) {
    this.map = mapInstance;
    this.map.setCenter(new google.maps.LatLng(16.240584, 103.2569)); //16.246261 103.252502

    let response = await this.http.get<[]>('http://202.28.34.197/LoRaTracker/SmartLocation/'+JSON.stringify(20)).toPromise();
    let lati = Array();
    let longi = Array();
    let frequency = Array();
    let snr = Array();
    let rssi = Array();
    let rssi_p = Array();
    let LatLng = [];

    for (let index in response) {
      lati.push(response[index]['latitude']);
      longi.push(response[index]['longitude']);
      frequency.push(response[index]['frequency']);
      rssi.push(response[index]['rssi']);
      rssi_p.push(response[index]['rssi_p']);
      snr.push(response[index]['snr']);

      LatLng.push({location: new google.maps.LatLng(response[index]['latitude'], response[index]['longitude']),weight:Math.abs(response[index]['rssi_p'])});
    }
    this.heatmap = new google.maps.visualization.HeatmapLayer({         
      map: this.map,
      data: LatLng
    });
    
    var gradient = [
      'rgba(0, 0, 0, 0)', // white
      'rgba(0, 255, 0, 255)', // green
      'rgba(255, 255, 0, 255)',  // yellow
      'rgba(255,0,0,1)', // red
    ]
    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient) // ไล่ระดับสี
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : this.zoom); // รัศมี
    this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 1); // ความทึบ
    this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true); // ทำให้กระจายตัว
    this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 80); // ความเข้มสูงสุด 
    
    // console.log('LatLng ',LatLng);
    // console.log('heatmap ',this.heatmap);
  }

  

}
