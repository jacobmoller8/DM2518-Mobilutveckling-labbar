import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


import ProductScreen from "./ProductScreen";
import List from "../Presentational/List";

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
                        Golfklubbar
                  </div>
                </Toolbar>}>
                <List pushPage={this.pushPage}></List>
                <List pushPage={this.pushPage}></List>
                <List pushPage={this.pushPage}></List>
                <List pushPage={this.pushPage}></List>

            </Page>
        )
    }
}

export default withRouter(ListTabScreen);