import React, { Component } from 'react';
import { connect } from 'react-redux';


class AddProject extends Component {

    render() {

        return (

            <div>
                <h1>Add Project</h1>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    state: state,
});



export default withStyles(styles)(connect(mapStateToProps)(AddProject));