import React, { Component } from 'react';
import axios from 'axios'

let info, bounds, oldInfo, oldMarker
const google = window.google
const center = { lat: 45.757950, lng: 21.228988 }
const zoom = 17
const zoomMarker = 18
const mapStyle = [
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
]


class MapContainer extends Component {

  componentDidMount() {
    this.getVenues()
  }


  initMap = () => {

    const map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: zoom,
    });

    info = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds()

    this.createMarkers(map);

    map.set("styles", mapStyle);
  }

  createMarkers = map => {
    // locations props from App
    this.props.venues.map(marker => {
      return this.addMarkers(marker, map);
    });
  }


  addMarkers = (props, map) => {

    const inactive = "https://maps.google.com/mapfiles/kml/pal2/icon62.png"
    const active = "https://maps.google.com/mapfiles/kml/pal2/icon54.png"

    const marker = new google.maps.Marker({
      position: {lat: props.venue.location.lat, lng: props.venue.location.lng},
      map: map,
      title: props.venue.name,
      icon: inactive,
      animation: google.maps.Animation.DROP,
      key: props.venue.id,
    });

    // load markers to App markers[]
    const { markers } = this.props
    markers.push(marker)
    this.setState({ markers })

    bounds.extend(marker.position)

    marker.addListener("click", () => {

      map.setCenter(marker.position)
      map.setZoom(zoomMarker)

      // setState to activeMarker in App
      this.props.onClickMarker(marker)

      // from: https://stackoverflow.com/questions/27754101/change-google-maps-marker-icon-when-clicking-on-other
      // check to see if oldMarker is set
      // if so, set the icon back to the default
      oldMarker && oldMarker.setIcon(inactive);
      marker.setIcon(active)
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(()=> {
        marker.setAnimation(null)
      }, 600)

      // from: https://groups.google.com/forum/#!topic/google-maps-js-api-v3/cA2VRg4TO1k
      // autoclose infowindow when other marker is pressed
      if (typeof(oldInfo) !== "undefined") {
        oldInfo.close();
      }

      const infoContent = `<h3>${props.venue.name}</h3>` +
        `<p>${props.venue.location.address}</p>` +
        `<a href="https://foursquare.com/v/${props.venue.id} "` +
        `target="_blank">Check it on Foursquare</a>`

      info.setContent(infoContent)
      info.open(map, marker);

      oldInfo = info
      oldMarker = marker
    }); // end listener marker + info

    // set default center, icon and close infowindow
    info.addListener("closeclick", () => {
      // reset setState to activeMarker in App for display in header
      this.props.onCloseInfo()

      map.setCenter(center)
      map.setZoom(zoom)
      marker.setIcon(inactive)
      // info.setMarker = null;
      info.close()
    })

    map.addListener("click", () => {
      this.props.onCloseInfo()
      info.close()
      map.setCenter(center)
      map.setZoom(zoom)
      marker.setIcon(inactive)
    })
  }; // end addMarkers


  getVenues = () => {

    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      radius: 200,
      limit: 10,
      query: "coffee",
      ll: "45.757950,21.228988",
      client_id: "KX5RWBG5XB3TB4YQIKH3KEBTHPO0RIOPLQ1JXDEHXU40K30B",
      client_secret: "V3YUN1GQ0IGXQPXWXPTS2CA1AYXYSZVY1YJJITGUHTPYWKE2",
      v: 20180818,
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {

          const data = response.data.response.groups[0].items

          // response from FS is loaded to App venues[]
          this.props.pushVenues(data)

          // initalize map
          this.initMap()
      })
      .catch(error => {
        // alert("Can't get data from Foursquare")
        console.log(error)
      })
  } // end getVenues()


  render() {
    return (
      <div className="map" id="map"></div>
    )
  }
}


export default MapContainer