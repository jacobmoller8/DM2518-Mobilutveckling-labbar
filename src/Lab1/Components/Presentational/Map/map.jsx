import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './map.css'

export default class Map extends Component {
    render() {
        let tiltBtn = null
        if (this.props.tiltVisibility){
            tiltBtn = <Button className="mapTypeBtn" onClick={() => this.props.onTiltClick()}> Tilt Map</Button>
        }else{
            tiltBtn = <Button className="mapTypeBtn" disabled onClick={() => this.props.onTiltClick()}> Tilt Map</Button>
        }


        return (
            <div className="container-fluid col-12 mapWrapper">
                <div className="container-fluid header">
                    <div className="row justify-content-center">
                        <h3 id="headerTitle"> Our cool map</h3>
                        {tiltBtn}
                    </div>
                </div>
                <div className="mapContainer">
                    <div id="map"></div>
                </div>
                <div className="container-fluid col-12 col-md-10  mapTypeBtnContainer">
                    <div className="row justify-content-center">
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('satellite')}>Satellite</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('hybrid')}>Hybrid</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('roadmap')}>Roadmap</Button>
                        <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('terrain')}>Terrain</Button>
                        <Button className="zoomBtn" onClick={() => this.props.onZoomClick(1)}>+</Button>
                        <Button className="zoomBtn" onClick={() => this.props.onZoomClick(-1)}>-</Button>
                    </div>
                </div>
            </div>
        )
    }
}
