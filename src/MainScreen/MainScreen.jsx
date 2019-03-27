import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

import "./MainScreen.css"
import SplashScreen from "./SplashScreen";

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1500)
    }

    render() {

        if (this.state.loading) return (<SplashScreen></SplashScreen>)

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col" align="center">
                            <h1>DM2518 Labs</h1>
                            <h5>Hugo Bergqvist & Jacob Möller & Björn Andersson</h5>
                            <div>
                                <Link to="/Lab1Screen">
                                    <Button className="Btn"> View Lab 1 </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/">
                                    <Button className="Btn"> View Lab 2 </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/">
                                    <Button className="Btn"> View Lab 3 </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/">
                                    <Button className="Btn"> View Lab 4 </Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/">
                                    <Button className="Btn"> View Lab 5 </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}



export default withRouter(MainScreen);