import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeolocationProvider {


    constructor(private geolocation: Geolocation) { }

    get currentPosition(): Observable<any> {
        return this.geolocation.watchPosition();
    }

}
