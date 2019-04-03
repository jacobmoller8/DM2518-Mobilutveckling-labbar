import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar, Icon, ToolbarButton } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


import ProductScreen from "./ProductScreen";
import AboutTabScreen from "./AboutTabScreen";
import List from "../Presentational/List";

import courses from "../../Data/Data";

class ListTabScreen extends Component {

    pushPage = (data) => {
        localStorage.setItem('courseData', JSON.stringify(data));
        this.props.navigator.pushPage({
            component: ProductScreen
        });
    }
    pushAboutPage = () => {
        this.props.navigator.pushPage({
            component: AboutTabScreen
        });
    }

    render() {

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="center">
                        Golfklubbar
                  </div>
                    <div className="right">
                        <ToolbarButton onClick={this.pushAboutPage}>
                            <Icon size={{ default: 30 }}
                                icon={{ default: 'ion-ios-information-outline' }}>
                            </Icon>
                        </ToolbarButton>
                    </div>
                </Toolbar>}>
                <List pushPage={this.pushPage} data={courses.course1}></List>
                <List pushPage={this.pushPage} data={courses.course2}></List>
                <List pushPage={this.pushPage} data={courses.course3}></List>
                <List pushPage={this.pushPage} data={courses.course4}></List>
            </Page>
        )
    }
}

export default withRouter(ListTabScreen);