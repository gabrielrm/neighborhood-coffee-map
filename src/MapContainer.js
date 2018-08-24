import React, { Component } from 'react';

const google = window.google
const center = { lat: 45.757950, lng: 21.228988 }
const zoom = 17
let info, bounds, oldInfo, oldMarker


class MapContainer extends Component {

  componentDidMount() {
    this.initMap
  }


  initMap = () => {

    const map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: zoom,
    });

    info = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds()

    this.createMarkers(map);
  }

  createMarkers = map => {
    // locations props from App
    this.props.locations.map(marker => {
      return this.addMarkers(marker, map);
    });
  }


  addMarkers = (props, map) => {
    const marker = new google.maps.Marker({
      position: props.latLng,
      map: map,
      title: props.title,
      icon: props.icon,
      animation: google.maps.Animation.DROP,
      key: props.id,
    });

    bounds.extend(marker.position)

    marker.addListener("click", () => {

      map.setCenter(marker.position)

      // setState to activeMarker in App
      this.props.onClickMarker(marker)

      // from: https://stackoverflow.com/questions/27754101/change-google-maps-marker-icon-when-clicking-on-other
      // check to see if oldMarker is set
      // if so, set the icon back to the default
      oldMarker && oldMarker.setIcon(props.icon);
      marker.setIcon(props.sIcon)

      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(()=> {
        marker.setAnimation(null)
      }, 2000)

      // from: https://groups.google.com/forum/#!topic/google-maps-js-api-v3/cA2VRg4TO1k
      // autoclose infowindow when other marker is pressed
      if (typeof(oldInfo) !== "undefined") {
        oldInfo.close();
      }

      info.setContent(`<h3>${props.title}</h3><p>Address: ${props.address}</p>`)
      info.open(map, marker);

      // set default center, icon and close infowindow
      info.addListener("closeclick",function(){
        map.setCenter(center)
        marker.setIcon(props.icon);
        info.setMarker = null;
      })

      oldInfo = info
      oldMarker = marker

    }); // end listener marker + info

  }; // end addMarkers

  render() {
    return (
      <div className="map" id="map"></div>
    )
  }
}


export default MapContainer