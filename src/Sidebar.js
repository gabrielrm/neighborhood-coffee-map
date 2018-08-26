import React, { Component } from 'react';

class Sidebar extends Component {

  // check if Enter key is used to activate element
  checkKey = (event, location) => {
    if (event.charCode === 13) {
      this.props.onSelectMarker(location);
    }
  };

  render() {
    return (
      <div className="Sidebar">
        <div className="search">
          <input
            role="search"
            aria-label="search for coffee places"
            type="text"
            placeholder="Search.."
            value={this.props.searchQuery}
            onChange={(event) => this.props.updateQuery(event.target.value)}
          />
        </div>
        <div className="list">
          <ul>
            {this.props.markers.filter(marker => marker.visible).map((marker, id) => (
              <li
                tabIndex="0"
                role="button"
                key={id}
                onKeyPress={event => {
                  this.checkKey(event, marker.title);
                }}
                onClick={ () => this.props.onSelectMarker(marker.title) }
              >
                {marker.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar