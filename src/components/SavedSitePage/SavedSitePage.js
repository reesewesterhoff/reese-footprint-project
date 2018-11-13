import React, { Component } from 'react';
import { connect } from 'react-redux';

class SavedSitesPage extends Component {

    render() {
        return (

            <div>
                <h1>Saved Site</h1>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    state: state,
});


export default connect(mapStateToProps)(SavedSitesPage);