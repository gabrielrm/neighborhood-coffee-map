import React, { Component } from 'react';


const center = { lat: 45.757950, lng: 21.228988 }
const zoom = 17


class MapContainer extends Component {

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD8jVDfm4tIBvN-Yuz98zdaqqmQa_avqFY&v=3&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: zoom,
    });
  }


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