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
            {this.props.venues.map(location => (
              <li
                key={location.venue.id}
                onClick={ () => this.props.onSelectMarker(location.venue.name) }
              >
                {location.venue.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar