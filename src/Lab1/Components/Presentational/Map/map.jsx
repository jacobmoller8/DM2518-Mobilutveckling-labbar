import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './map.css'

export default class Map extends Component {
    render() {
        return (
            <div className="container-fluid col-12">
                <div className="container-fluid header">
                    <h3 id="headerTitle"> Our cool map</h3>
                </div>
                <div className="mapContainer">
                    <div id="map"></div>
                </div>
                <div className="container-fluid col-8 mapTypeBtnContainer">
                <div class="row justify-content-center">
                    <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('satellite')}>Satellite</Button>
                    <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('hybrid')}>hybrid</Button>
                    <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('roadmap')}>roadmap</Button>
                    <Button className="mapTypeBtn" onClick={() => this.props.onMaptypeClick('terrain')}>terrain</Button>
                </div>
                </div>
            </div>
        )
    }
}
