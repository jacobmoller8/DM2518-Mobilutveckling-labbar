import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './map.css'

export default class Map extends Component {
    render() {
        return (
            <div className="container-fluid col-12">
                <div className="container-fluid header">
                    <div className="row justify-content-center">
                        <h3 id="headerTitle"> Our cool map</h3>
                        <Button className="mapTypeBtn" onClick={() => this.props.onTiltClick()}> Tilt Map</Button>
                    </div>
                </div>
                <div className="mapContainer">
                    <div id="map"></div>
                </div>
                <div className="container-fluid col-12 col-md-8  mapTypeBtnContainer">
                    <div className="row justify-content-center">
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('satellite')}>Satellite</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('hybrid')}>Hybrid</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('roadmap')}>Roadmap</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('terrain')}>Terrain</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onZoomClick(1)}>+</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onZoomClick(-1)}>-</Button>
                    </div>
                </div>
            </div>
        )
    }
}
