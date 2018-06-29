import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default class GoogleMap extends Component {
  static defaultProps = {
    center: { lat: -16.4298271, lng: -71.5256504 },
    zoom: 15
  }
render() {
    return (
      <div 
      style={{padding: '5px',
              height: '30vh', 
              width:'100%'}}>
        <GoogleMapReact
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
        </GoogleMapReact>
      </div>
    )
  }
}