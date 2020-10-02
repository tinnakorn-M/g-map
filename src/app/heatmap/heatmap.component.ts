import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { MapsService } from '../maps.service';

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  title = "Tracker";

  latCenter ;
  lngCenter ;
  accuracy ;
  zoom = 16;
  make_lat;
  make_long;

  mean_latitude;
  mean_longitude;
  mean_rssi;
  mean_snr;
  mean_frequency;
  mean_time;
  namesetting: string = 'satellite';
  count = 0;


  public map: google.maps.Map;
  public heatmap: google.maps.visualization.HeatmapLayer; 
  searchBox: any;


  constructor(private http: HttpClient, private maps: MapsService) { }

  ngOnInit() {
    // this.maps.getLocation().subscribe(data => {
    //   console.log(data);
    //   this.latCenter = data.latitude;
    //   this.lngCenter = data.longitude;
    // });

    if(!navigator.geolocation){
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.latCenter = position.coords.latitude;
      this.lngCenter = position.coords.longitude;
      this.accuracy = position.coords.accuracy;
      // console.log('lat: '+this.latCenter);
      // console.log('lat: '+this.lngCenter);
      console.log('accuracy: '+this.accuracy);
    });

    
  }

  
  async onChoseLocation(event){
    let latitude = event.coords.lat;
    let longitude = event.coords.lng;
    this.make_lat = latitude;
    this.make_long =longitude;
    console.log(latitude);
    console.log(longitude);

    let response = await this.http
      .get('http://202.28.34.197/LoRaTracker/meanLocation/'+JSON.stringify(latitude)+'/'+JSON.stringify(longitude)+'/'+JSON.stringify(0.00005)).toPromise();

    if(response){
      this.mean_latitude = response[0]['latitude'];
      this.mean_longitude = response[0]['longitude'];
      this.mean_rssi = response[0]['rssi'];
      this.mean_snr = response[0]['snr'];
      this.mean_frequency = response[0]['frequency'];
      this.mean_time = response[0]['time'];

      // moment.locale('EN');    
      // let date = moment(mean_time).format('L'), time= moment(mean_time).format('LTS');
      // let Date_Time = date+" "+time;

      let info;
      let locals = {latitude : this.mean_latitude.toFixed(6), longitude : this.mean_longitude.toFixed(6), rssi : this.mean_rssi, snr : this.mean_snr,
                    frequency : this.mean_frequency, time : this.mean_time};
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
  settings(){
    if(this.count == 0){
      this.namesetting = 'hybrid';
      this.count+=1;
    }else if(this.count == 1){
      this.namesetting = 'satellite';
      this.count+=1;
    }
    else{
      this.namesetting = 'terrain';
      this.count = 0;
    }
  }

  async onMapLoad(mapInstance:  google.maps.Map) {
    this.map = mapInstance;
    // this.map.setCenter(new google.maps.LatLng(this.latCenter, this.lngCenter)); //16.246261 103.252502
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('Settings'));

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
    
  }

  markers: marker[] = [
	  {
		  lat: 16.246627494203636,
		  lng: 103.25215825338576,
		  label: 'GW',
		  draggable: false
	  },
	  {
		  lat: 16.240459186712496,
		  lng: 103.25696399125086,
		  label: 'GW',
		  draggable: false
	  },
  ]

}
