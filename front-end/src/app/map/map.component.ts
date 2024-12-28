import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import {circle, Icon, icon, latLng, marker, polygon, tileLayer, Map as LeafletMap} from 'leaflet';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [
    LeafletModule,
    NgIf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  leafletLayer = marker([ 46.879966, -121.726909 ], {
    icon: icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  });

  leafletOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 11,
    center: latLng(48.8575, 2.3514) // Paris
  };

  leafletLayersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }

  leafletShowLayer = true;
  leafletLayers = [
    circle([ 48.8575, 2.3514 ], { radius: 5000 }),
    // polygon([[ 48.8575, 2.3514 ], [ 48.8575, 2.36 ], [ 48.86, 2.35 ]]),
    // marker([ 48.8575, 2.3514 ])
  ];


  onMapReady($event: LeafletMap) {
    // Do stuff with map
  }
}
