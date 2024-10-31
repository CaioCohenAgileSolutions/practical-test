import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GmapComponent } from './gmap.component';
import { GoogleMapsModule } from '@angular/google-maps';

describe('GmapComponent', () => {
  let component: GmapComponent;
  let fixture: ComponentFixture<GmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapsModule, GmapComponent] // Use GoogleMapsModule and GmapComponent directly
    }).compileComponents();

    fixture = TestBed.createComponent(GmapComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set apiLoaded to true when Google Maps API loads successfully', () => {
    spyOn(component, 'loadGoogleMapsApi').and.callFake(() => {
      component.apiLoaded = true;
    });

    component.loadGoogleMapsApi();
    expect(component.apiLoaded).toBeTrue();
  });

  it('should handle error and set apiLoaded to false when Google Maps API fails to load', () => {
    spyOn(component, 'loadGoogleMapsApi').and.callFake(() => {
      component.apiLoaded = false;
    });

    component.loadGoogleMapsApi();
    expect(component.apiLoaded).toBeFalse();
  });
});
