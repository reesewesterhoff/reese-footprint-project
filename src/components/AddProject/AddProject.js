import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class AddProject extends Component {

    state = {
        projectName: '',
        user_id: this.props.user.id,
    }

    render() {

        const { classes } = this.props;

            return (

                <div>
                    <h1 className="heading">Add Project</h1>
                </div>

            );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
});

AddProject.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(AddProject));