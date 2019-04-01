import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class AboutTabScreen extends Component {

    render() {

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="center">
                        About Page
                  </div>
                </Toolbar>}>
                <p>2</p>
            </Page>
        )
    }
}

export default withRouter(AboutTabScreen);