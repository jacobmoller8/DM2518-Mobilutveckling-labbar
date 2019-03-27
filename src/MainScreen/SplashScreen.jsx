import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";

import "./SplashScreen.css"

class SplashScreen extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col" align="center">
                            <div className="lds-dual-ring"></div>
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}

export default withRouter(SplashScreen);