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
    
  });

  leafletOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: latLng(48.891, 2.242) // Paris
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
    marker([48.89622158620204, 2.2357236697931], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon-2x.png'
      })
    }).bindTooltip('Campus at La Defense'),
    marker([48.8866893926894, 2.248939669792551], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon-2x.png',
      })
    }).bindTooltip('Campus Cyber'),
    marker([48.89653138916405, 2.2201073660887256], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon-2x.png',
      })
    }).bindTooltip('Campus Terasses'),
    marker([47.28131885965755, -1.5195087368831164], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon-2x.png',
      })
    }).bindTooltip('Campus Nantes'),
    marker([43.643202028582934, 3.84064543881431], {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon-2x.png',
      })
    }).bindTooltip('Campus Montpellier')
  ];


  onMapReady($event: LeafletMap) {
    // Do stuff with map
  }
}
