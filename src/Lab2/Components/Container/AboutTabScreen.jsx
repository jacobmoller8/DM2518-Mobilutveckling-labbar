import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Page, Toolbar, Card, List, ListItem, BackButton } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class AboutTabScreen extends Component {

    render() {

        return (
            <Page renderToolbar={() =>
                <Toolbar>
                    <div className="left">
                        <BackButton modifier={this.props.modifier}>Back</BackButton>
                    </div>
                    <div className="center">
                        Om oss
                  </div>
                </Toolbar>}>
                <Card>
                    <h1>Grupp X</h1>
                </Card>
                <List >
                    <ListItem>
                        Jacob Möller
                    </ListItem>
                    <ListItem>
                        Hugo Bergqvist
                    </ListItem>
                    <ListItem>
                        Björn Andersson
                    </ListItem>

                </List>
            </Page>
        )
    }
}

export default withRouter(AboutTabScreen);