import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class UserDashboard extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PROJECTS', payload: {id: this.props.user.id} });
      }

    render() {


        const { classes } = this.props;

            return (

                <div>
                    <h1 className="heading">Dashboard</h1>
                    <h2 className="subHeading">Projects</h2>

                </div>

            );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
});

UserDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(UserDashboard));