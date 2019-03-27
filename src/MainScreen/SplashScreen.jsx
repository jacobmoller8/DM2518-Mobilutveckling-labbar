import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";

import "./SplashScreen.css"

class SplashScreen extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="row justify-content-md-center">
                    <div class="lds-dual-ring"></div>
                </div>

            </React.Fragment >
        )
    }
}

export default withRouter(SplashScreen);