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
            disableDefaultUI: true
        });
        
        this.setState({ map: newMap })
    }

    onAddMarkerClick = (drag, animate) => {
        let center = this.state.map.getCenter();
        let withAnimation = ''
        if (animate === 'drop'){
            withAnimation = window.google.maps.Animation.DROP
        }else{
            withAnimation = window.google.maps.Animation.BOUNCE
        }

        var marker = new window.google.maps.Marker({
            map: this.state.map,
            draggable: drag,
            animation: withAnimation,
            position: center
          });

          marker.addListener('click', toggleBounce);

          function toggleBounce ()  {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }
          }
        // maybe this.state.markers.push(marker) would be better instead of new copy
          this.setState({markers: [...this.state.markers, marker]})
    }

    onRemoveMarkerClick = () => {
        if (this.state.markers.length > 0){
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
        if (newZoom===1){
            newZoom = 2
        }
        if (newZoom >= 18){
            this.setState({
                tiltVisibility: true
            })
        }else{
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
        const hugoCoords = {coords: {latitude: 55.676098, longitude: 12.568337}}
        const jacobCoords = {coords: {latitude: 1.352083, longitude: 103.819839}}
        const bjornCoords = {coords: {latitude: -8.340539, longitude: 115.091949}}

        if(person === 'Björn'){
            this.setLocation(bjornCoords)
        }else if(person === 'Jacob'){
            this.setLocation(jacobCoords)
        }else{
            this.setLocation(hugoCoords)
        }
    
        this.state.map.setZoom(12)
        this.state.map.setMapTypeId('hybrid')

    }

    setLocation = (pos) => {
        let newLat = pos.coords.latitude;
        let newLong = pos.coords.longitude;
        let newCoords = {lat: newLat, lng: newLong}
        this.state.map.setCenter(newCoords)
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
                onSetLocationClick={this.onSetLocationClick}/>
            </span>
        )
    }
}



export default withRouter(Lab1Screen);