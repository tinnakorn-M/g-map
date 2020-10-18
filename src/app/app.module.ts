import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; 
import { AgmCoreModule } from '@agm/core'; // Modules GoogleMap in Angular
import { ToolbarModule } from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItem } from 'primeng/api';                  //api

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { Routes, RouterModule } from '@angular/router';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';

import { MatIconModule } from '@angular/material/icon';

export const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'header',component: HeaderComponent},
  {path: 'footer',component: FooterComponent},
  {path: 'map',component: MapComponent},
  {path: 'heatmap',component: HeatmapComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeatmapComponent,
    FooterComponent,
    MapComponent,
    
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    ToolbarModule,
    AccordionModule,
    ButtonModule,
    PanelModule,
    CardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqQrWQglp2FubxYUX_Ta3QkOJLF5bMQNg',
      libraries: ['visualization']
    })
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// https://www.producthunt.com/posts/location-history-visualizer  ที่มา อย่าลบ
// https://www.joyofdata.de/blog/interactive-heatmaps-with-google-maps-api/  ที่มา อย่าลบ
