import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position, Polyline } from 'nativescript-google-maps-sdk';
import { Accuracy } from "ui/enums";
import { isEnabled, enableLocationRequest, getCurrentLocation } from "nativescript-geolocation";
import { SearchService } from "../../shared/search.service";

registerElement('MapView', () => MapView);

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    location = '';
    destination = '';
    searchData: any;

    mapView: MapView;
    latitude = -33.86;
    longitude = 151.20;
    zoom = 8;
    bearing = 0;
    tilt = 0;

    private locationMarker: Marker;
    private destinationMarker: Marker;


    constructor(private searchService: SearchService) {
    }

    /**
     * Confirm the reservation
     * @todo implement backend service confirmation
     */
    confirm(): void {
        alert('Confirmed');

        // this.searchService.confirm..
    }

    /**
     * Find current location using hardware api and create a new marker
     */
    findCurrentLocation() {
        if (!isEnabled()) {
            return enableLocationRequest();
        }

        getCurrentLocation({desiredAccuracy: Accuracy.high}).then(loc => {
            if (loc) {
                this.latitude = loc.latitude;
                this.longitude = loc.longitude;

                this.locationMarker = new Marker();
                this.locationMarker.color = 'blue';
                this.locationMarker.position = Position.positionFromLatLng(loc.latitude, loc.longitude);
                this.mapView.addMarker(this.locationMarker);

                this.searchService.getAddress(this.latitude, this.longitude).then(data => {
                    this.location = data.formatted_address;
                });
            }
        }, e => {
            console.log("Error: " + e.message);
        });
    }

    /**
     * Ask for location permissions if not granted
     */
    ngOnInit(): void {
        if (!isEnabled()) {
            enableLocationRequest();
        }
    }

    /**
     * Side drawer menu
     */
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    /**
     * Google map ready event
     * @param event
     */
    onMapReady(event): void {
        this.mapView = event.object;
        this.findCurrentLocation();
    }

    /**
     * Search for a destination
     */
    search(): void {
        if (this.location && this.destination) {
            this.searchService.findAddress(this.destination).then(data => {
                if (data) {
                    this.destination = data.formatted_address;
                    const location = data.geometry.location;

                    this.mapView.removeAllShapes();
                    if (this.destinationMarker) this.mapView.removeMarker(this.destinationMarker);

                    this.destinationMarker = new Marker();
                    this.destinationMarker.position = Position.positionFromLatLng(location.lat, location.lng);
                    this.mapView.addMarker(this.destinationMarker);

                    const polyline = new Polyline;
                    polyline.addPoint(Position.positionFromLatLng(this.latitude, this.longitude));
                    polyline.addPoint(Position.positionFromLatLng(location.lat, location.lng));
                    this.mapView.addPolyline(polyline);

                    this.searchService.estimatePrice(this.latitude, this.longitude, location.lat, location.lng)
                        .then(data => {
                            this.searchData = data;
                        });
                } else {
                    alert('Unknown destination!');
                }
            });
        } else {
            alert('All fields are required!');
        }
    }

    /**
     * Set current location
     */
    setCurrentLocation(): void {
        if (this.location) {
            this.searchService.findAddress(this.location).then(data => {
                if (data) {
                    this.location = data.formatted_address;
                    const location = data.geometry.location;

                    this.latitude = location.lat;
                    this.longitude = location.lng;

                    if (this.locationMarker) this.mapView.removeMarker(this.locationMarker);

                    this.locationMarker = new Marker();
                    this.locationMarker.color = 'blue';
                    this.locationMarker.position = Position.positionFromLatLng(location.lat, location.lng);
                    this.mapView.addMarker(this.locationMarker);
                } else {
                    alert('Unknown location!');
                }
            });
        }
    }
}
