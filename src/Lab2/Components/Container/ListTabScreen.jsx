import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar, Button } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import ProductScreen from "./ProductScreen";

class ListTabScreen extends Component {

    pushPage = () => {
        this.props.navigator.pushPage({
            component: ProductScreen
        });
    }

    render() {

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="center">
                        List Page
                  </div>
                </Toolbar>}>
                <Button onClick={this.pushPage}>Product Page</Button>
            </Page>
        )
    }
}

export default withRouter(ListTabScreen);