import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class ListTabScreen extends Component {

    render() {

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="center">
                        List Page
                  </div>
                </Toolbar>}>
                <p>Hej</p>
            </Page>
        )
    }
}

export default withRouter(ListTabScreen);