import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { Page, Tabbar, Tab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import ListTabScreen from "../Components/Container/ListTabScreen";
import AboutTabScreen from "../Components/Container/AboutTabScreen";

class TabBarNavigation extends Component {

    renderTabs = () => {
        return [
            { tab: <Tab label='Golfklubbar' icon="md-home" key={"ListTab"} />, content: <ListTabScreen key={"ListTabPage"} navigator={this.props.navigator} /> },
            { tab: <Tab label='Om oss' icon="ion-ios-information-outline" key={"AboutTab"} />, content: <AboutTabScreen key={"AboutTabPage"} navigator={this.props.navigator} /> }
        ];
    }

    render() {

        return (
            <Page>
                <Tabbar
                    position='bottom'
                    renderTabs={this.renderTabs}
                />
            </Page>
        )
    }
}

export default withRouter(TabBarNavigation);