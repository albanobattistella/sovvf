import { Injectable } from '@angular/core'; 

import {} from '@types/googlemaps';

@Injectable() export class MapService { 

    private map: google.maps.Map; 
    private markers: google.maps.Marker[] = [];

    constructor() { } 

    /*** Creates a new map inside of the given HTML container. ***/
    /*** @param el DIV element ***/ 
    /*** @param mapOptions MapOptions object specification ***/ 
    initMap(el: HTMLElement, mapOptions: any): void { 
        this.map = new google.maps.Map(el, mapOptions); 

        // Adds event listener resize when the window changes size. 
        window.addEventListener("resize", () => { this.resize(); }); 
    } 

    setCenter(latLng: google.maps.LatLng): void {
        if (this.map != null && latLng != null) { 
            this.map.panTo(latLng); 
        } 
    } 

    setZoom(zoom: number): void {
        if (this.map != null) { 
            this.map.setZoom(zoom); 
        } 
    } 

    /*** Adds a marker. ***/
    /*** @param latLng Marker position            ***/ 
    /*** @param title Tooltip                     ***/ 
    /*** @param contentString InfoWindow' content ***/ 
    //addMarker(latLng: google.maps.LatLng, title?: string, contentString?: string): void {
    addMarker(latLng: google.maps.LatLng, title?: string, contentString?: string, iconMarker?: string): void {        
        if (this.map != null && latLng != null) {
            if(iconMarker == ""){
                iconMarker='https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png';
            }
            let  image = {
                url: iconMarker,
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
              };
            alert(iconMarker);
            // Creates the marker. 
            const marker: google.maps.Marker = new google.maps.Marker({ 
                    position: latLng
                   ,title: title + '\n' + contentString
                   ,icon: image
            }); 
            // Adds the marker to the map. 
            marker.setMap(this.map); 
            // Creates the info window if required. 
            if (contentString != null) { 
                // Sets the max width of the info window to the width of the map element. 
                const width: number = this.map.getDiv().clientWidth; 
                const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow({ 
                      content: contentString, 
                      maxWidth: width 
                }); 
                // Makes the info window visible. 
                marker.addListener('click', () => { 
                    infoWindow.open(this.map, marker); 
                }); 
            } 

            // Pushes it to the markers array. 
            this.markers.push(marker);
        } 
    } 

    deleteMarkers(): void {
        // Removes the markers from the map. 
        for (let i: number = 0; i < this.markers.length; i++) { 
            this.markers[i].setMap(null); 
        } 
        // Removes references to them. 
        this.markers = []; 
    } 

    private resize(): void {
        // Saves the center. 
        const latLng: google.maps.LatLng = this.map.getCenter(); 
        // Triggers resize event. 
        google.maps.event.trigger(this.map, "resize"); 
        // Restores the center. 
        this.map.setCenter(latLng); 
    } 

}  // END class MapsService 