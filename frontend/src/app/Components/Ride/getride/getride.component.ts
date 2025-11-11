
import { AfterViewInit, Component, inject } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker'
import { MatCardModule } from '@angular/material/card';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { ChooserideComponent } from "../chooseride/chooseride.component";
import maplibregl from 'maplibre-gl';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../../services/loading.service';



@Component({
  selector: 'app-getride',
  standalone: true,
  imports: [NgIf, NgFor, MatFormField, MatLabel, MatCardModule, MatInputModule, MatPrefix, MatButtonModule, ReactiveFormsModule, MatIcon, ChooserideComponent],
  templateUrl: './getride.component.html',
  styleUrl: './getride.component.css'
})
export class GetrideComponent implements AfterViewInit {
  router = inject(Router)
  toastrService = inject(ToastrService)
  dialog = inject(MatDialog);
  sharedService = inject(SharedService)
  loadingService = inject(LoadingService)
  formBuilder = inject(FormBuilder);
  map!: maplibregl.Map;              // MapLibre map instance
  routeform!: FormGroup            // Angular form for pickup/destination
  pickupMarker!: maplibregl.Marker;  // Marker for pickup
  destMarker!: maplibregl.Marker;    // Marker for destination
  distance: number | null = null;    // Distance in km
  time: number | null = null;           // Time
  routeLayerId = 'route';

  pickuplocation: String = ''
  droplocation: String = ''


  pickupResults: any[] = [];         // Nominatim search results for pickup
  destResults: any[] = [];           // Nominatim search results for destination






  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize form with default text values
    this.routeform = this.fb.group({
      pickup: ['New Delhi'],           // default pickup location
      destination: ['Delhi Airport']   // default destination
    });

  }

  ngOnInit() {
    let values = this.routeform.value
    this.pickuplocation = values.pickup
    this.droplocation = values.destination

  }

  ngAfterViewInit() {
    // Initialize MapLibre map
    this.map = new maplibregl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles-layer',
            type: 'raster',
            source: 'osm-tiles'
          }
        ]
      },
      center: [77.2090, 28.6139], // Delhi
      zoom: 12
    });
    this.map.on('style.load', () => {
      // Style has finished loading here!
      // Now safe to add markers, sources, layers or make route requests, etc.
      console.log('Map style loaded.');

      // Example: add your route or other stuff here
    });


    // Initialize markers at default positions
    this.pickupMarker = new maplibregl.Marker().setLngLat([77.2090, 28.6139]).addTo(this.map);
    this.destMarker = new maplibregl.Marker().setLngLat([77.1025, 28.7041]).addTo(this.map);
    // Draw initial route between default pickup and destination
    this.showRoute();
  }

  /**
 * Search for place using Nominatim API (free OpenStreetMap geocoding)
 * type = 'pickup' or 'destination'
 */

  searchPlace(type: 'pickup' | 'destination') {

    const query = this.routeform.value[type];

    if (!query) return;

    // Call Nominatim search API
    this.http.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&viewbox=72.5,22.0,80.9,15.5&bounded=1&limit=10`)
      .subscribe({
        next: (res: any) => {
          if (type === 'pickup') this.pickupResults = res;  // store pickup suggestions
          else this.destResults = res;
         
        },
        error: (error) => {

        }


      });
  }

  /**
   * User selects a place from dropdown suggestions
   * type = 'pickup' or 'destination'
   * place = selected Nominatim result
   */
  selectPlace(type: 'pickup' | 'destination', place: any) {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    if (type === 'pickup') {
      this.pickupMarker.setLngLat([lon, lat]);               // update marker position
      this.pickupResults = [];                               // clear suggestions
      this.routeform.patchValue({ pickup: place.display_name });// update input 
      this.pickuplocation=place.display_name;
    } else {
      this.destMarker.setLngLat([lon, lat]);
      this.destResults = [];
      this.routeform.patchValue({ destination: place.display_name });
      this.droplocation=place.display_name;
      
    }

    // Draw route if both markers are set
    if (this.pickupMarker && this.destMarker) this.showRoute();
  }

  /**
   * Show route between pickup and destination using OSRM API (free routing)
   */

  showRoute() {
    const pickupLngLat = this.pickupMarker.getLngLat();
    const destLngLat = this.destMarker.getLngLat();
    const destination = { lng: 77.2315, lat: 28.6519 };


    // Build OSRM routing API URL




    let url = `https://router.project-osrm.org/route/v1/driving/${pickupLngLat.lng},${pickupLngLat.lat};${destLngLat.lng},${destLngLat.lat}?overview=full&geometries=geojson`;





    // Remove previous route layer if it exists


    this.http.get(url).subscribe({
      next: (res: any) => {
        const coords = res.routes[0].geometry.coordinates;
        if (res.routes[0].distance && res.routes[0].duration) {
          this.distance = +(res.routes[0].distance / 1000).toFixed(2); // distance in km
          this.time = +(res.routes[0].duration / 60).toFixed(1)


          new maplibregl.Popup({ offset: 25, className: 'custom-popup' })
            .setLngLat([destination.lng, destination.lat])
            .setHTML(`
    <div class=" text-black p-3 rounded-md shadow-lg text-sm font-medium ">
      🛣 Distance: ${this.distance} km<br>
      ⏱ Time: ${this.time} min
    </div>
  `)
            .addTo(this.map);
        }//minutes
        else {
          console.log('Distance or duration missing in route:', res.routes[0]);
        }



        if (this.map.getLayer(this.routeLayerId)) {
          this.map.removeLayer(this.routeLayerId);
          this.map.removeSource(this.routeLayerId);
        }
        const route = {
          type: 'LineString' as const,
          coordinates: coords
        };

        if (this.map.getSource(this.routeLayerId)) {
          (this.map.getSource(this.routeLayerId) as maplibregl.GeoJSONSource).setData({
            type: 'Feature',
            geometry: route,
            properties: {}
          });
        } else {
          this.map.addSource(this.routeLayerId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: route,
              properties: {}
            }
          });

          this.map.addLayer({
            id: this.routeLayerId,
            type: 'line',
            source: this.routeLayerId,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#0074D9', 'line-width': 4 }
          });
        }
          // Fit bounds
          const bounds = coords.reduce((b: any, coord: any) => b.extend(coord), new maplibregl.LngLatBounds(coords[0], coords[0]));
          this.map.fitBounds(bounds, { padding: 50 });

      },
        error: (error) => {
          this.toastrService.warning("Time Might Not Be Accurate", 'Warning')

        }

    });


  }








  openDialog() {
    let values = this.routeform.value;
    console.log(values)
    let dialogref = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog-class',
      data: {
        from: values.pickup,
        to: values.destination,

      }
    });
    if (dialogref) {
      dialogref.afterClosed().subscribe((result: any) => {
        // Layer ID for route line
        if (!result) return;
        this.sharedService.setDialogResult(result);

      })
    }

    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.setDialogResult(result);
      }
    });

  };

}
