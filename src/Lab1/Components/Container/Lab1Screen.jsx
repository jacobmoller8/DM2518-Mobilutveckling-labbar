import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Map from '../Presentational/Map/map'


function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

class Lab1Screen extends Component {
    constructor(props) {
        super(props)

        this.setLocation = this.setLocation.bind(this)

        this.state = {
            map: '',
            tiltVisibility: false,
            markers: []
        }
    }

    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?callback=initMap")
        window.initMap = this.initMap
    }

    initMap = () => {
        let kthCoords = { lat: 59.3498092, lng: 18.0684758 }

        var newMap = new window.google.maps.Map(document.getElementById('map'), {
            center: kthCoords,
            zoom: 10,
            mapTypeId: 'satellite',
            disableDefaultUI: true,
            gestureHandling: 'none',
            zoomControl: false
        });

        this.setState({ map: newMap }, () => {
            this.markFavoritePlaces()
        })
    }

    markFavoritePlaces = () => {
        const hugoCoords = { lat: 55.676098, lng: 12.568337 }
        const jacobCoords = { lat: 1.352083, lng: 103.819839 }
        const bjornCoords = { lat: -8.340539, lng: 115.091949 }

        let bjornMessage = `
        <div id="content">
            <div id="siteNotice"> 
            </div>
            <h4 id="firstHeading" class="firstHeading">Welcome to Bali, surfers paradise!</h4>
            <div id="bodyContent">
                <p> I bet Björn is somewhere around here. </p>
            </div>
        </div>`

        let jacobMessage = `
        <div id="content">
            <div id="siteNotice"> 
            </div>
            <h4 id="firstHeading" class="firstHeading">Welcome to Singapore!</h4>
            <div id="bodyContent">
             <p> You'll find Jacob in a library around here soon. </p>
            </div>
        </div>`

        let hugoMessage = `
        <div id="content">
            <div id="siteNotice"> 
            </div>
            <h4 id="firstHeading" class="firstHeading">Welcome to Copenhagen!</h4>
            <div id="bodyContent">
                <p> Good sausage, beer and tiny mermaids on rocks. </p>
            </div>
        </div>`

        this.addDefaultMarker(hugoCoords, hugoMessage)
        this.addDefaultMarker(jacobCoords, jacobMessage)
        this.addDefaultMarker(bjornCoords, bjornMessage)

    
    }

    addDefaultMarker = (pos, message) => {
        var image = {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new window.google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new window.google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new window.google.maps.Point(0, 32)
        };


        var infowindow = new window.google.maps.InfoWindow({
            content: message
        });

        var defaultMarker = new window.google.maps.Marker({
            map: this.state.map,
            draggable: false,
            animation: window.google.maps.Animation.DROP,
            position: pos,
            icon: image
        });
        let curMap = this.state.map
        defaultMarker.addListener('click', function() {
            infowindow.open(curMap, defaultMarker);
          });
    }


    onAddMarkerClick = (drag, animate) => {
        let center = this.state.map.getCenter();
        let withAnimation = ''
        if (animate === 'drop') {
            withAnimation = window.google.maps.Animation.DROP
        } else {
            withAnimation = window.google.maps.Animation.BOUNCE
        }

        var marker = new window.google.maps.Marker({
            map: this.state.map,
            draggable: drag,
            animation: withAnimation,
            position: center
        });

        marker.addListener('click', toggleBounce);

        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }
        }
        // maybe this.state.markers.push(marker) would be better instead of new copy
        this.setState({ markers: [...this.state.markers, marker] })
    }

    onRemoveMarkerClick = () => {
        if (this.state.markers.length > 0) {
            let latestPin = this.state.markers.pop()
            latestPin.setMap(null)
        }
    }

    onMaptypeClick = (mapType) => {
        this.state.map.setMapTypeId(mapType)
    }

    onZoomClick = (zoom) => {
        let prevZoom = this.state.map.getZoom()
        let newZoom = prevZoom + zoom
        // Max zoom out
        if (newZoom === -1) {
            newZoom = 0
        }
        if (newZoom >= 18) {
            this.setState({
                tiltVisibility: true
            })
        } else {
            this.setState({
                tiltVisibility: false
            })
        }
        this.state.map.setZoom(newZoom)

    }

    onTiltClick = () => {
        let tiltState = this.state.map.getTilt()
        if (tiltState === 45) {
            this.state.map.setTilt(0)
        } else {
            this.state.map.setTilt(45)
        }
    }

    onGetLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    onSetLocationClick = (person) => {
        const hugoCoords = { coords: { latitude: 55.676098, longitude: 12.568337 } }
        const jacobCoords = { coords: { latitude: 1.352083, longitude: 103.819839 } }
        const bjornCoords = { coords: { latitude: -8.340539, longitude: 115.091949 } }

        if (person === 'Björn') {
            this.setLocation(bjornCoords)
        } else if (person === 'Jacob') {
            this.setLocation(jacobCoords)
        } else {
            this.setLocation(hugoCoords)
        }

        this.state.map.setZoom(12)
        this.state.map.setMapTypeId('hybrid')

    }

    onNavClick = (direction) => {
        let currentCenter = this.state.map.getCenter()
        let curLng = currentCenter.lng()
        let curLat = currentCenter.lat()
        let newCenter = { coords: { latitude: curLat, longitude: curLng } }
        let currentZoom = this.state.map.getZoom()
        let moveDist = 0.01
        console.log('curZoom: ', currentZoom)
        if (currentZoom >= 18) {
            moveDist = 0.0001
        } else if (17 >= currentZoom && currentZoom >= 15) {
            moveDist = 0.001
        } else if (14 >= currentZoom && currentZoom >= 9) {
            moveDist = 0.01
        } else if (8 >= currentZoom && currentZoom >= 5) {
            moveDist = 0.1
        } else {
            moveDist = 1
        }
        console.log('moveDist: ', moveDist)
        if (direction === 'up') {
            newCenter.coords['latitude'] = (curLat + moveDist)
            this.setLocation(newCenter)
        } else if (direction === 'down') {
            newCenter.coords['latitude'] = (curLat - moveDist)
            this.setLocation(newCenter)
        } else if (direction === 'left') {
            newCenter.coords['longitude'] = (curLng - moveDist)
            this.setLocation(newCenter)
        } else {
            newCenter.coords['longitude'] = (curLng + moveDist)
            this.setLocation(newCenter)
        }
    }

    setLocation = (pos) => {
        let newLat = pos.coords.latitude;
        let newLong = pos.coords.longitude;
        let newCoords = { lat: newLat, lng: newLong }
        this.state.map.panTo(newCoords)
    }

    render() {

        return (
            <span>
                <Map
                    onMaptypeClick={this.onMaptypeClick}
                    onTiltClick={this.onTiltClick}
                    tiltVisibility={this.state.tiltVisibility}
                    onZoomClick={this.onZoomClick}
                    onAddMarkerClick={this.onAddMarkerClick}
                    onRemoveMarkerClick={this.onRemoveMarkerClick}
                    onGetLocationClick={this.onGetLocationClick}
                    onSetLocationClick={this.onSetLocationClick}
                    onNavClick={this.onNavClick} />
            </span>
        )
    }
}



export default withRouter(Lab1Screen);