import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar, BackButton } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import "../../Styling/style.css";

class ProductScreen extends Component {

    render() {
        const courseData = JSON.parse(localStorage.getItem('courseData'));

        return (
            <Page renderToolbar={() =>
                <Toolbar modifier={this.props.modifier} >
                    <div className="left">
                        <BackButton className="icon" modifier={this.props.modifier}>Back</BackButton>
                    </div>
                    <div className="center">
                        {courseData.title}
                    </div>
                </Toolbar>}>
                <img src={courseData.course_picture} height="250px" width={window.innerWidth} alt={courseData.course_picture}></img>
                <h1>{courseData.title}</h1>
                <p>{courseData.description_long}</p>
            </Page>
        )
    }
}

export default withRouter(ProductScreen);