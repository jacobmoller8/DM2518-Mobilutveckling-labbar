import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './map.css'

export default class Map extends Component {
    render() {
        let tiltBtn = null
        if (this.props.tiltVisibility) {
            tiltBtn = <Button className="tiltBtn" onClick={() => this.props.onTiltClick()}> Tilt Map</Button>
        } else {
            tiltBtn = <Button className="tiltBtn" disabled onClick={() => this.props.onTiltClick()}> Tilt Map</Button>
        }


        return (
            <div className="container-fluid col-12 mapWrapper">
                <div className="container-fluid header">
                    <div className="row justify-content-center">
                        <h3 id="headerTitle"> Our cool map</h3>
                    </div>
                </div>
                <div className="mapContainer">
                    <div id="map"></div>
                </div>
                <div className="container-fluid col-sm-12 col-md-10 col-lg-8 btnContainer">
                    <div className="row">
                        <div className="container-fluid btnRowContainer">
                            <h5 className="btnRowTitle ">Map type buttons: </h5>
                            <Button className="mapTypeBtn col-3" onClick={() => this.props.onMaptypeClick('satellite')}>Satellite</Button>
                            <Button className="mapTypeBtn col-3" onClick={() => this.props.onMaptypeClick('hybrid')}>Hybrid</Button>
                            <Button className="mapTypeBtn col-3" onClick={() => this.props.onMaptypeClick('roadmap')}>Roadmap</Button>
                            <Button className="mapTypeBtn col-3" onClick={() => this.props.onMaptypeClick('terrain')}>Terrain</Button>
                        </div>
                    </div>
                    <div className="row">

                        <div className="container-fluid btnRowContainer col-6">
                            <h5 className="btnRowTitle">Zoom buttons: </h5>
                            <Button className="zoomBtn" onClick={() => this.props.onZoomClick(1)}>+</Button>
                            <Button className="zoomBtn" onClick={() => this.props.onZoomClick(-1)}>-</Button>
                        </div>
                        <div className="container-fluid btnRowContainer col-6">
                            <h5 className="btnRowTitle">Function buttons: </h5>
                            {tiltBtn}
                        </div>
                    </div>
                    <div className="row">

                        <div className="container-fluid btnRowContainer">
                            <h5 className="btnRowTitle">Pin buttons: </h5>
                            <Button size="sm" className="markerBtn col-3" onClick={() => this.props.onAddMarkerClick(true, 'drop')}>Add Drop Pin</Button>
                            <Button size="sm" className="markerBtn col-3" onClick={() => this.props.onAddMarkerClick(true, 'bounce')}>Add Bounce Pin</Button>
                            <Button size="sm" className="markerBtn col-3" onClick={() => this.props.onAddMarkerClick(false, 'drop')}>Add Stuck Pin</Button>
                            <Button size="sm" className="markerBtn col-3" onClick={() => this.props.onRemoveMarkerClick()}>Remove Pin</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
