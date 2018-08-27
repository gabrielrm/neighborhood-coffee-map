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


  // update venues retrieved by Map (axios) from FS
  getVenues = (data) => {
    this.setState({ venues: data })
  }

  // update activeMarker on marker click
  onClickMarker = (marker) => {
    this.setState({ activeMarker: marker })
  }

  // reset activeMarker
  onCloseInfo = () => {
    this.setState({ activeMarker: [] })
  }

  // list item open info
  onSelectMarker = (location) => {

    const venueName = location
    // because apostrophe breaks syntax, I put the text
    // in a JavaScript var and insert it into JSX with the {} notation:
    document.querySelector(`div[title="${venueName}"]`).click();
  }

  // update query based on input
  updateQuery = (query) => {
    this.setState({ query })
  }

  render() {
    // if query got input
    if (this.state.query) {
      // if is query transform to lowercase and check in venues for match
      this.state.venues.forEach((loc, id) => {
        if (loc.venue.name.toLowerCase().includes(this.state.query.toLowerCase())) {
          // match found make corespondent markers visible
          this.state.markers[id].setVisible(true)
        } else {
          // and others not visible
          this.state.markers[id].setVisible(false)
        }
      })
    // if query input empty or deleted
    } else {
      // make all markers visible
      this.state.venues.forEach((loc, id) => {
        if (this.state.markers.length) {
          this.state.markers[id].setVisible(true)
        }
      })
    }

    return (
      <div className="App">
        <header className="Header" role="banner">
          <div className="Title" role="heading" tabIndex="0">
            <h1>
              Neighborhood Coffee
            </h1>
          </div>
          <div className="Coffee">
            <p>
              {this.state.activeMarker.title}
            </p>
          </div>
        </header>
        <div className="Main">
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
      </div>
    );
  }
}

export default App;
