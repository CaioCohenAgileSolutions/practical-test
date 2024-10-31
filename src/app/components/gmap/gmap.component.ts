import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'; // Import HttpClientModule
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapOptions } from '../../models/mapOptions';

@Component({
  selector: 'app-gmap',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, HttpClientModule, HttpClientJsonpModule],
  templateUrl: './gmap.component.html',
  styleUrl: './gmap.component.scss'
})
export class GmapComponent implements OnInit, OnChanges {
  apiLoaded = false;
  optionsLoaded = true;

  @Input() mapOptions: MapOptions = {
    lat: 40.73061,
    lng: -73.935242,
    zoom: 12,
    draggable: true
  };

  options: google.maps.MapOptions = {
    center: { lat: this.mapOptions.lat, lng: this.mapOptions.lng },
    zoom: this.mapOptions.zoom,
  };

  markerPosition: google.maps.LatLngLiteral = { lat: this.mapOptions.lat, lng: this.mapOptions.lng };
  markerOptions: google.maps.MarkerOptions = { draggable: this.mapOptions.draggable };

  constructor(private httpClient: HttpClient) {    
  }

  ngOnInit(): void {
    this.loadGoogleMapsApi();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapOptions']) {
      this.updateMapOptions();
    }
  }

  loadGoogleMapsApi(): void {
    this.httpClient
      .jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`, 'callback')
      .subscribe({
        next: () => {
          this.apiLoaded = true;
          console.log('Google Maps API loaded successfully.');
        },
        error: (error) => {
          this.apiLoaded = false;
          console.error('Error loading Google Maps API:', error);
        }
      });
  }

  updateMapOptions(): void {
    this.options = {
      center: { lat: this.mapOptions.lat, lng: this.mapOptions.lng },
      zoom: this.mapOptions.zoom,
    };
    this.markerPosition = { lat: this.mapOptions.lat, lng: this.mapOptions.lng };
    this.markerOptions = { draggable: this.mapOptions.draggable };
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent) {
    console.log('Marker dragged to:', event.latLng?.toJSON());
  }

  navigateToLocation() {
    console.log('Navigating to location...');
  }
}
