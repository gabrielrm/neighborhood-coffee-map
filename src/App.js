import React, { Component } from 'react';
import './App.css';
import MapContainer from "./MapContainer"

class App extends Component {

  state = {
    locations: [
      {
        id: 'misto',
        ll: "45.756761,21.2252533",
        title: "Misto Restaurant",
        address: "",
        latLng: {
          lat: 45.756761,
          lng: 21.227447
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon63.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon55.png",
        active: true,
      },
      {
        id: 'aethernativ',
        ll: "45.7583275,21.225634",
        title: 'Aethernativ',
        address: "",
        latLng: {
          lat: 45.758328,
          lng: 21.226183
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon62.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon54.png",
        active: true,
      },
      {
        id: 'reciproc',
        ll: "45.758437,21.226172",
        title: 'Reciproc',
        address: "",
        latLng: {
          lat: 45.758437,
          lng: 21.226172
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon62.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon54.png",
        active: true,
      },
      {
        id: 'suppa',
        ll: "45.7587731,21.2271506",
        title: 'Suppa Bar',
        address: "",
        latLng: {
          lat: 45.758797,
          lng: 21.227299
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon62.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon54.png",
        active: true,
      },
      {
        id: 'yamy',
        ll: "45.758807,21.2266748",
        title: "Yamy Bistro",
        address: "",
        latLng: {
          lat: 45.758807,
          lng: 21.227223
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon63.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon55.png",
        active: true,
      },
      {
        id: 'omelette',
        ll: "45.756286,21.2258079",
        title: 'Neata Omelette Bistro',
        address: "",
        latLng: {
          lat: 45.756286,
          lng: 21.228002
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon62.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon54.png",
        active: true,
      },
      {
        id: 'cafeneaua',
        ll: "45.756137,21.224671",
        title: 'Cafeneaua Verde',
        address: "",
        latLng: {
          lat: 45.756137,
          lng: 21.226865
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon62.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon54.png",
        active: true,
      },
      {
        id: 'zai',
        ll: "45.756755,21.226538",
        title: 'Zai Apres Cafe',
        address: "",
        latLng: {
          lat: 45.756755,
          lng: 21.228732
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon62.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon54.png",
        active: true,
      },
      {
        id: 'locanda',
        ll: "45.7576457,21.2238343",
        title: 'Locanda Del Corso',
        address: "",
        latLng: {
          lat: 45.757646,
          lng: 21.226028
        },
        icon: "https://maps.google.com/mapfiles/kml/pal2/icon63.png",
        sIcon: "https://maps.google.com/mapfiles/kml/pal2/icon55.png",
        active: true,
      }
    ],
    activeMarker: [],
  }


  onClickMarker = (marker) => {
    this.setState({ activeMarker: marker })
    // console.log(this.state.activeMarker.length)
  }


  handleSelectMarker = (location) => {
    // this.setState({ activeMarker: location })
    console.log(location)
  }

  render() {

    return (
      <div className="App">
        <div className="header" style={{height: 20}}>
          <p>
            {this.state.activeMarker.title}
          </p>
        </div>
        <MapContainer
          locations={this.state.locations}
          onClickMarker={this.onClickMarker}
        />
      </div>
    );
  }
}

export default App;
