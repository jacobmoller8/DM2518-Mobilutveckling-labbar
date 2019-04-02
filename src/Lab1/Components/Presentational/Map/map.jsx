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
				<div className="row">
					<div className="container-fluid mapContainer col-8 col-md-10">
						<div id="map"></div>
					</div>
					<div className="container-fluid sideBtnContainer col-4 col-md-2">
						<h5 className="btnRowTitle">Zoom: </h5>
						<div className="row">
							<div className="container-fluid col-12">
								<Button className="zoomBtn" onClick={() => this.props.onZoomClick(1)}>+</Button>
								<Button className="zoomBtn" onClick={() => this.props.onZoomClick(-1)}>-</Button>
							</div>
						</div>
						<h5 className="btnRowTitle">Navigation: </h5>
						<div className="container-fluid col-12 navBtns">
							<div className="row navRow"><Button className="upBtn" onClick={() => this.props.onNavClick('up')}>U</Button></div>
							<div className="row navRow"><Button className="leftBtn" onClick={() => this.props.onNavClick('left')}>L</Button><Button className="rightBtn" onClick={() => this.props.onNavClick('right')}>R</Button></div>
							<div className="row navRow"><Button className="downBtn" onClick={() => this.props.onNavClick('down')}>D</Button></div>
						</div>
						<div className="container-fluid btnRowContainer">
							<h5 className="btnRowTitle">Map Tilt: </h5>
							{tiltBtn}
						</div>
					</div>
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
					<div className="row">
						<div className="container-fluid btnRowContainer">
							<h5 className="btnRowTitle">Location buttons: </h5>
							<div className="row">
								<div className="container-fluid col-3 locationCont">
									<Button size="sm" className="locationBtn" onClick={() => this.props.onGetLocationClick()}>Current Location</Button>
									<p>Click to show your current location on the map!</p>
								</div>
								<div className="container-fluid col-3 locationCont">
									<Button size="sm" className="locationBtn" onClick={() => this.props.onSetLocationClick("Hugo")}>Hugos Favorite</Button>
									<p>Click here to travel to Copenhagen, city of Rød pølse and beer</p>
								</div>
								<div className="container-fluid col-3 locationCont">
									<Button size="sm" className="locationBtn" onClick={() => this.props.onSetLocationClick("Jacob")}>Jacobs Favorite</Button>
									<p>Click here to travel to the place where Jacob will spend next fall</p>
								</div>
								<div className="container-fluid col-3 locationCont">
									<Button size="sm" className="locationBtn" onClick={() => this.props.onSetLocationClick("Björn")}>Björns Favorite</Button>
									<p>Click here to travel to the place which Björn gladly escapes to</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
