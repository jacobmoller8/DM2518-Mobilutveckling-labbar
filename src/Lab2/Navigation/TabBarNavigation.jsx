import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { Page, Tabbar, Tab } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import ListTabScreen from "../Components/Container/ListTabScreen";
import AboutTabScreen from "../Components/Container/AboutTabScreen";
import courses from '../Data/Data'
import ProductScreen from '../Components/Container/ProductScreen'

class TabBarNavigation extends Component {

    renderTabs = () => {
        return [
            { tab: <Tab label='Golfklubbar' icon="md-home" key={"ListTab"} />, content: <ListTabScreen key={"ListTabPage"} navigator={this.props.navigator} /> },
						{ tab: <Tab label='Om oss' icon="ion-ios-information-outline" key={"AboutTab"} />, content: <AboutTabScreen key={"AboutTabPage"} navigator={this.props.navigator} /> },
						{ tab: <Tab label={courses.course1.title} icon="ion-ios-analytics" key={courses.course1.title} />, content: <ProductScreen key={courses.course1.title} navigator={this.props.navigator} currentCourse={courses.course1}/> },
						{ tab: <Tab label={courses.course2.title} icon="ion-ios-analytics" key={courses.course2.title} />, content: <ProductScreen key={courses.course2.title} navigator={this.props.navigator} currentCourse={courses.course2}/> },
						{ tab: <Tab label={courses.course3.title} icon="ion-ios-analytics" key={courses.course3.title} />, content: <ProductScreen key={courses.course3.title} navigator={this.props.navigator} currentCourse={courses.course3}/> },
						{ tab: <Tab label={courses.course4.title} icon="ion-ios-analytics" key={courses.course4.title} />, content: <ProductScreen key={courses.course4.title} navigator={this.props.navigator} currentCourse={courses.course4}/> }
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