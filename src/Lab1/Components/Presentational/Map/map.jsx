import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

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
                <Button onClick={() => this.props.onMaptypeClick('satellite')}>Satellite</Button>
                <Button onClick={() => this.props.onMaptypeClick('hybrid')}>hybrid</Button>
                <Button onClick={() => this.props.onMaptypeClick('roadmap')}>roadmap</Button>
                <Button onClick={() => this.props.onMaptypeClick('terrain')}>terrain</Button>
            </React.Fragment>
        )
    }
}
