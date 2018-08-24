import React, { Component } from 'react';
import './App.css';
import MapContainer from "./MapContainer"
import Sidebar from "./Sidebar";

class App extends Component {

  state = {
    venues: [],
    activeMarker: [],
    query: "",
    markers: [],
  }


  // load markers from Map
  getMarkers = (data) => {
    // this.setState({ venues: data }, console.log("getVenues"))
    this.setState({ markers: data })
  }

  // load venues retrieved by Map (axios) from FS
  getVenues = (data) => {
    // this.setState({ venues: data }, console.log("getVenues"))
    this.setState({ venues: data })
  }

  onClickMarker = (marker) => {
    this.setState({ activeMarker: marker })
    // console.log(this.state.activeMarker.length)
  }

  onCloseInfo = () => {
    // this.setState({ activeMarker: [] }, console.log("inActiveMarker"))
    this.setState({ activeMarker: [] })
  }

  // list item open info
  onSelectMarker = (location) => {

    const venueName = location
    // because apostrophe breaks syntax, put the text
    // in a JavaScript var and insert it into JSX with the {} notation:
    document.querySelector(`div[title="${venueName}"]`).click();
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  render() {

    if (this.state.query) {
      console.log(this.state.query)
      this.state.venues.forEach((local, id) => {
        if (local.venue.name.toLowerCase().includes(this.state.query.toLowerCase())) {
        console.log(local.venue.name)
        // this.state.markers[id].setVisible(true)
        // document.querySelector(`div[title="${local.venue.name}"]`).click();
          // console.log("FOUND")
        }
      })
    }

    return (
      <div className="App">
        <div className="header" style={{height: 20}}>
          <p>
            {this.state.activeMarker.title}
          </p>
        </div>
        <Sidebar
          venues={this.state.venues}
          onSelectMarker={this.onSelectMarker}
          markers={this.state.markers}
          updateQuery={this.updateQuery}
          searchQuery={this.state.query}
        />
        <MapContainer
          venues={this.state.venues}
          pushVenues={this.getVenues}
          onClickMarker={this.onClickMarker}
          onCloseInfo={this.onCloseInfo}
          pushMarkers={this.getMarkers}
        />
      </div>
    );
  }
}

export default App;
