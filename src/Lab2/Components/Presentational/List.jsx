import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Card } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


class List extends Component {

    render() {

        return (
            <Card onClick={() => this.props.pushPage(this.props.data)}>
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <h2>{this.props.data.title}</h2>
                            <p>{this.props.data.description_short}</p>
                        </div>

                        <div className="col-4">
                            <img src={this.props.data.logo_picture} height="100px" width="100px" alt={this.props.data.logo_picture}></img>
                        </div>

                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(List);