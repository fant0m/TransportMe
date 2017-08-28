import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { Config } from './config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {
    // mockups only
    private pricePerKm = 1;
    private startPrice = 3;
    private headers =  new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    estimatePrice(lat1: number, lng1: number, lat2: number, lng2: number): Promise<object> {
        // replace with http request to your backend in prod
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&` +
                    `origins=${lat1},${lng1}&destinations=${lat2},${lng2}&key=${Config.googleApiKey}`;

        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(response => {
                const result = response.json().rows[0].elements[0];

                return {
                    'distance': result.distance.text,
                    'text': result.duration.text,
                    'price': this.calcPrice(result.distance.value, 1)
                };
            })
            .catch(this.handleError);
    }

    findAddress(address: string): Promise<any> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${Config.googleApiKey}`;

        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(response => {
                const results = response.json().results;

                return results[0];
            })
            .catch(this.handleError);
    }

    getAddress(lat: number, lng: number): Promise<any> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${Config.googleApiKey}`;

        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(response => {
                const results = response.json().results;

                return results[0];
            })
            .catch(this.handleError);
    }

    private calcPrice(meters: number, factor: number): string {
        const price = (this.pricePerKm / 1000 * factor) * meters;

        return price.toFixed(2);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
