import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar, BackButton } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


class ProductScreen extends Component {

    render() {

        return (
            <Page renderToolbar={() =>
                <Toolbar modifier={this.props.modifier} >
                    <div className="left">
                        <BackButton modifier={this.props.modifier}>Back</BackButton>
                    </div>
                    <div className="center">
                        Product Page
                  </div>
                </Toolbar>}>
                <p>Hej</p>

            </Page>
        )
    }
}

export default withRouter(ProductScreen);