import React, { Component } from 'react';

class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <div className="search">
          <input
            type="text"
            placeholder="Search.."
            value={this.props.searchQuery}
            onChange={(event) => this.props.updateQuery(event.target.value)}
          />
        </div>
        <div className="list">
          <ul>
            {this.props.markers.filter(marker => marker.getVisible()).map((marker, id) => (
              <li
                key={id}
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