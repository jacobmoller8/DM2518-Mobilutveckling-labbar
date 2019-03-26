import React, { Component } from 'react'

import './map.css'

export default class Map extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid header">
                    <h3 id="headerTitle"> Our cool map</h3>
                </div>
                <div className="mapContainer">
                    <div id="map"></div>
                </div>
            </React.Fragment>
        )
    }
}
