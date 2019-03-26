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

    componentDidMount(){
        this.renderMap()
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?callback=initMap")
        window.initMap = this.initMap
    }

    initMap = () => {
        new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 59.3498092, lng: 18.0684758 },
            zoom: 15
        });
    }
    

    render() {
        return (
            <span>
                <Map/>
            </span>
        )
    }
}



export default withRouter(Lab1Screen);