import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Map from '../Presentational/Map/map'

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement(
        "script"
    )
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

class Lab1Screen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            map: '',
            tiltVisibility: false
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
        var newMap = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 59.3498092, lng: 18.0684758 },
            zoom: 10,
            mapTypeId: 'satellite',
            disableDefaultUI: true
        });
        this.setState({ map: newMap })
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

    render() {

        return (
            <span>
                <Map onMaptypeClick={this.onMaptypeClick} onTiltClick={this.onTiltClick} tiltVisibility={this.state.tiltVisibility} onZoomClick={this.onZoomClick}/>
            </span>
        )
    }
}



export default withRouter(Lab1Screen);