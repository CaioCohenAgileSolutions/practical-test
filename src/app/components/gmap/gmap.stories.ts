import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MapOptions } from '../../models/mapOptions';
import { GmapComponent } from './gmap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';


// Sample data for demonstration
export const GMapOptionsExample: MapOptions = {
  lat: -20.940,
  lng: -43.3493045,
  zoom: 12,
  draggable: true
}

// Meta configuration
const meta: Meta<GmapComponent> = {
  title: 'Components/Gmap',
  component: GmapComponent,
  decorators: [
    moduleMetadata({
      imports: [GoogleMapsModule, CommonModule, HttpClientModule, HttpClientJsonpModule],
    }),
  ],
  tags: ['autodocs'],
  args: {
    mapOptions: GMapOptionsExample
  }
};

export default meta;
type Story = StoryObj<GmapComponent>;

// Default story with sample data
export const Default: Story = {};
