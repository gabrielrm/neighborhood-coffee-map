import React, { Component } from 'react';
import './App.css';
import MapContainer from "./MapContainer"
import Sidebar from "./Sidebar";

// https://developers.google.com/maps/documentation/javascript/events#auth-errors
// Handle Google Maps error
window.gm_authFailure = () => {
  alert("Authentication failure, check your Google API key!");
};

class App extends Component {

  state = {
    venues: [],
    activeMarker: [],
    query: "",
    markers: [],
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
      this.state.venues.forEach((loc, id) => {
        // console.log(loc)
        if (loc.venue.name.toLowerCase().includes(this.state.query.toLowerCase())) {
          this.state.markers[id].setVisible(true)
        } else {
          this.state.markers[id].setVisible(false)
        }
      })
    } else {
      this.state.venues.forEach((loc, id) => {
        if (this.state.markers.length) {
          this.state.markers[id].setVisible(true)
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
          markers={this.state.markers}
          venues={this.state.venues}
          pushVenues={this.getVenues}
          onClickMarker={this.onClickMarker}
          onCloseInfo={this.onCloseInfo}
        />
      </div>
    );
  }
}

export default App;
