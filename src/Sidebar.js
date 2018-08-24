import React, { Component } from 'react';

class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <div className="list">
          <ul>
            {this.props.locations.map(location => (
              <li
                key={location.id}
                onClick={ () => this.props.onSelectMarker(location.title) }
              >
                {location.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar