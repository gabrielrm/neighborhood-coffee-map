import React, { Component } from 'react';
import './App.css';
import MapContainer from "./MapContainer"
import Sidebar from "./Sidebar";

class App extends Component {

  state = {
    venues: [],
    activeMarker: [],
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
        <Sidebar
          venues={this.state.venues}
          onSelectMarker={this.handleSelectMarker}
        />
        <MapContainer
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
