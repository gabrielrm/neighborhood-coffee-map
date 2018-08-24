import React, { Component } from 'react';

const google = window.google
const center = { lat: 45.757950, lng: 21.228988 }
const zoom = 17
let info, bounds


class MapContainer extends Component {

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD8jVDfm4tIBvN-Yuz98zdaqqmQa_avqFY&v=3&callback=initMap")
    window.initMap = this.initMap
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

      marker.setIcon(props.sIcon)

      info.setContent(`<h3>${props.title}</h3><p>Address: ${props.address}</p>`)
      info.open(map, marker);

      // set default center, icon and close infowindow
      info.addListener('closeclick',function(){
        map.setCenter(center)
        marker.setIcon(props.icon);
        info.setMarker = null;
      })

    }); // end listener marker + info

  }; // end addMarkers

  render() {
    return (
      <div id="map"></div>
    )
  }
}


// function loadScript(url) {
//   const index = window.document.getElementByTagName("script")[0]
//   const script = window.document.createElement("script")
//   script.src = url
//   script.async = true
//   script.defer = true
//   index.parentNode.insertBefore(script, index)
// }


export default MapContainer