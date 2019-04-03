import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Map from '../Presentational/Map/map'


function loadScript(url) {
    // Creating a script tag and adds it to the page
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
        // Generates the script tag which initializes new Map object
        loadScript("https://maps.googleapis.com/maps/api/js?callback=initMap")

        // Tells the google maps initMap function to trigger our initMap function
        window.initMap = this.initMap
    }

    initMap = () => {
        let kthCoords = { lat: 59.3498092, lng: 18.0684758 }

        // Creates new map
        var newMap = new window.google.maps.Map(document.getElementById('map'), {
            center: kthCoords,
            zoom: 16,
            mapTypeId: 'hybrid',
            disableDefaultUI: true,
            gestureHandling: 'none',
            zoomControl: false
        });

        // adds the new map to state and creates markers on our favourite places as callback
        this.setState({ map: newMap }, () => {
            this.markFavoritePlaces()
        })
    }

    onBackClick = () => {
        this.props.history.push('/')
    }

    markFavoritePlaces = () => {
        // The information about our favorite places which will be added as pins to the map
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

        // Adds all three markers to the map
        this.addDefaultMarker(hugoCoords, hugoMessage)
        this.addDefaultMarker(jacobCoords, jacobMessage)
        this.addDefaultMarker(bjornCoords, bjornMessage)


    }

    addDefaultMarker = (pos, message) => {
        // Adds markers to our favorite places as soon as the map has loaded

        // Got this image from the google maps api docs
        var image = {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            size: new window.google.maps.Size(20, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(0, 32)
        };

        // Creates infoWindow which gets added to the pin
        var infowindow = new window.google.maps.InfoWindow({
            content: message
        });

        // Creates the marker
        var defaultMarker = new window.google.maps.Marker({
            map: this.state.map,
            draggable: false,
            animation: window.google.maps.Animation.DROP,
            position: pos,
            icon: image
        });

        // Makes the infoWindow pop up when clicked by user
        let curMap = this.state.map
        defaultMarker.addListener('click', function () {
            infowindow.open(curMap, defaultMarker);
        });
    }


    onAddMarkerClick = (drag, animate) => {
        // drag can be true or false, determines if the pin is supposed to be draggable


        // Sets the animation which will be added to the new pin, depending on user choice
        let withAnimation = ''
        if (animate === 'drop') {
            withAnimation = window.google.maps.Animation.DROP
        } else {
            withAnimation = window.google.maps.Animation.BOUNCE
        }

        let center = this.state.map.getCenter();

        // Creates new marker
        var marker = new window.google.maps.Marker({
            map: this.state.map,
            draggable: drag,
            animation: withAnimation,
            position: center
        });

        marker.addListener('click', toggleBounce);

        // Lets the user toggle pin bouncing
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
        // Removes the pin that was added the latest
        if (this.state.markers.length > 0) {
            let latestPin = this.state.markers.pop()
            latestPin.setMap(null)
        }
    }

    onMaptypeClick = (mapType) => {
        // Lets the user select between all four map types
        this.state.map.setMapTypeId(mapType)
    }

    onZoomClick = (zoom) => {
        let prevZoom = this.state.map.getZoom()
        let newZoom = prevZoom + zoom

        // sets max zoom out
        if (newZoom === -1) {
            newZoom = 0
        }

        // If zoomed in enough, the tilt mode button becomes enabled for the user
        if (newZoom >= 18) {
            this.setState({
                tiltVisibility: true
            })
        } else {
            this.setState({
                tiltVisibility: false
            })
        }

        // Sets the new Zoom level for the user
        this.state.map.setZoom(newZoom)

    }

    onTiltClick = () => {
        // Toggles google map tilt mode
        let tiltState = this.state.map.getTilt()
        if (tiltState === 45) {
            this.state.map.setTilt(0)
        } else {
            this.state.map.setTilt(45)
        }
    }

    onGetLocationClick = () => {
        // If the browser supports geolocation, gets the users geolocation and sends it to getCurrentPosition
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    onSetLocationClick = (person) => {
        // Lets the user select between three saved positions through clicking buttons

        // Saved coordinates for our favorite positions
        const hugoCoords = { coords: { latitude: 55.676098, longitude: 12.568337 } }
        const jacobCoords = { coords: { latitude: 1.352083, longitude: 103.819839 } }
        const bjornCoords = { coords: { latitude: -8.340539, longitude: 115.091949 } }

        // Sends the coordinates of the chosen place to setLocation()
        if (person === 'Björn') {
            this.setLocation(bjornCoords)
        } else if (person === 'Jacob') {
            this.setLocation(jacobCoords)
        } else {
            this.setLocation(hugoCoords)
        }

        // Sets the zoom to 12 and the map type to hybrid for a good first overview
        this.state.map.setZoom(12)
        this.state.map.setMapTypeId('hybrid')

    }

    onNavClick = (direction) => {
        let currentCenter = this.state.map.getCenter()
        let curLng = currentCenter.lng()
        let curLat = currentCenter.lat()

        let newCenter = { coords: { latitude: curLat, longitude: curLng } }

        // Adjust panning speed depending on Zoom
        let currentZoom = this.state.map.getZoom()
        let moveDist = 0.01
        if (currentZoom >= 18) {
            moveDist = 0.0001
        } else if (17 >= currentZoom && currentZoom >= 15) {
            moveDist = 0.001
        } else if (14 >= currentZoom && currentZoom >= 12) {
            moveDist = 0.01
        } else if (11 >= currentZoom && currentZoom >= 9) {
            moveDist = 0.1
        } else if (8 >= currentZoom && currentZoom >= 4) {
            moveDist = 1
        } else {
            moveDist = 10
        }

        // Sets new center based on navigation click, sends new center to setLocation
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
        // Takes position coordinates as input and pans the map to the new position
        let newLat = pos.coords.latitude;
        let newLong = pos.coords.longitude;
        let newCoords = { lat: newLat, lng: newLong }
        this.state.map.panTo(newCoords)
    }

    render() {

        return (
            <span>
                <Map
                    onBackClick={this.onBackClick}
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