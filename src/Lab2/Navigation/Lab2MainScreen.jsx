import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { Page, Tabbar, Tab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import ListTabScreen from "../Components/Container/ListTabScreen";
import AboutTabScreen from "../Components/Container/AboutTabScreen";

class Lab2MainScreen extends Component {

    renderTabs = () => {
        return [
            { tab: <Tab label='First Tab' icon="md-home" key={0} />, content: <ListTabScreen title="hej" key={0} /> },
            { tab: <Tab label='Second Tab' icon="md-settings" key={1} />, content: <AboutTabScreen key={1} /> }
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

export default withRouter(Lab2MainScreen);