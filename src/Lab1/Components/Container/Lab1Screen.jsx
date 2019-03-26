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
            mapType: 'hybrid'
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
            zoom: 15,
            mapTypeId: this.state.mapType
        });
        this.setState({ map: newMap })
    }

    onMaptypeClick = (mapType) => {
        if (mapType === "satellite") {
            this.setState({
                mapType: 'satellite'
            }, () => this.initMap())
        } else if (mapType === "terrain") {
            this.setState({
                mapType: 'terrain'
            }, () => this.initMap())
        } else if (mapType === "roadmap") {
            this.setState({
                mapType: 'roadmap'
            }, () => this.initMap())
        } else {
            this.setState({
                mapType: 'hybrid'
            }, () => this.initMap())
        }
    }


    render() {
        
        return (
            <span>
                <Map onMaptypeClick={this.onMaptypeClick} />
            </span>
        )
    }
}



export default withRouter(Lab1Screen);