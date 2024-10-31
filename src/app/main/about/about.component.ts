import { Component } from '@angular/core';
import { GmapComponent } from '../../components/gmap/gmap.component';
import { MapOptions } from '../../models/mapOptions';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [GmapComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  mapOptions: MapOptions = {
    lat: -20.940,
    lng: -43.3493045,
    zoom: 12,
    draggable: true
  };

}
