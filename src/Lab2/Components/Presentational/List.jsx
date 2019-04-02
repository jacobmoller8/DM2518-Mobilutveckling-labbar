import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Card } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import logo from "../../Assets/bjorkliden_logo.jpg";


class List extends Component {

    render() {

        return (

            <Card onClick={this.props.pushPage}>
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <h2>Björklidens GK</h2>
                            <p>Björklidens Golfklubb startades 1985 och har idag verksamhet på två kvalitativa golfanläggningar.
                                </p>
                        </div>

                        <div className="col-4">
                            <img src={logo} height="100px" width="100px" alt={logo}></img>
                        </div>

                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(List);