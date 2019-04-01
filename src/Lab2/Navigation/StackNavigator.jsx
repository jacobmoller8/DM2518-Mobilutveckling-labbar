import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { Page, Tabbar, Tab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import ListTabScreen from "../Components/Container/ListTabScreen";
import AboutTabScreen from "../Components/Container/AboutTabScreen";

class StackNavigator extends Component {

    render() {

        return (
            <Page>

            </Page>
        )
    }
}

export default withRouter(StackNavigator);