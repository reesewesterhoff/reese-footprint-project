import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

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

    

    render() {

        const { classes } = this.props;

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

AddProject.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(AddProject));