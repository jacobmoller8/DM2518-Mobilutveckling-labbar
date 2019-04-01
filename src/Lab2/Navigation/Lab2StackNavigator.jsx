import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Navigator } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import TabBarNavigation from "./TabBarNavigation";

class StackNavigator extends Component {

    renderPage = (route, navigator) => {
        const props = route.props || {};
        props.navigator = navigator;

        return React.createElement(route.component, props);
    }

    render() {
        return (
            <Navigator
                initialRoute={{ component: TabBarNavigation }}
                renderPage={this.renderPage}
            />
        );
    }
}

export default withRouter(StackNavigator);