import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
declare var google;

// Data
import { MAPSTYLES } from './shared/map-styles';

// Providers
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { UserProvider } from '../../providers/user/user';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
    currentLocation: any =  { lat: 40.7540864, lng: -82.5564557 };
    map: any;
    markers: any[] = [];
    people: any;
    zoom: number = 6;

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('range') range: ElementRef;

    constructor(
        private db: AngularFireDatabase,
        public navCtrl: NavController,
        private geolocationProvider: GeolocationProvider,
        private platform: Platform,
        private userProvider: UserProvider
    ) {  
        console.log(this.userProvider.userId);
    }

    clearMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });

        this.markers = [];
    }

    plotMarkers() {
        let markers = this.db.list('markers');

        markers.snapshotChanges().subscribe(markers => {
            this.clearMarkers();

            markers.forEach(marker => {
                this.createMarker(marker);
                this.centerMap();
            });
        });
    }

    private createMarker(marker) {
        let icon = marker.key === this.userProvider.userId ? '../../assets/imgs/icon-circle.png' : '../../assets/imgs/icon-marker.svg';
        let coords = marker.payload.val()['coords'];

        let createdMarker = new google.maps.Marker({
            map: this.map,
            icon: {
                url: icon,
                scaledSize: new google.maps.Size(25, 25)
            },
            position: coords
        })

        this.markers.push(createdMarker);
    }

    // DB
    private centerMap() {
        let latLng = new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng);
        this.map.panTo(latLng);
    }
    
    private addUserCoords(coords) {
        let markers = this.db.list('markers'),
            userId = this.userProvider.userId;

        if (userId) {
            markers.update(userId, {
                coords: coords,
                timestamp: Date.now()
            });
        }

        this.plotMarkers();
    }

    private getLocation() {
        this.geolocationProvider.currentPosition.subscribe(pos => {
            this.currentLocation = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };

            this.addUserCoords(this.currentLocation);
        });
    }

    initMap() {
        let options = {
            center: this.currentLocation,
            disableDefaultUI: true,
            styles: MAPSTYLES,
            zoom: this.zoom
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, options);
        this.getLocation();
    }

    ngAfterViewInit() {
        this.platform.ready().then(() => {
            this.initMap();
        });
    }

    ionViewDidLoad() { }
}
