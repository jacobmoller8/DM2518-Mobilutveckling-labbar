import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";



class MainScreen extends Component {

    render() {
        return (
            <React.Fragment>
                <p>Hej</p>
                <Link to="/Lab1Screen">
                    <button type="button">
                        View Lab 1
                </button>
                </Link>
            </React.Fragment>
        )
    }
}



export default withRouter(MainScreen);