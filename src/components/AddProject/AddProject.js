import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        country: '',
    }

    handleChange = property => event => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    render() {

        const { classes } = this.props;

            return (

                <div>
                    <h1 className="heading">Add Project</h1>
                            <TextField
                                id="standard-name"
                                label="Project Name"
                                className={classes.textField}
                                value={this.state.projectName}
                                required
                                onChange={this.handleChange('projectName')}
                                margin="normal"
                            />
                            <TextField
                                id="standard-name"
                                label="Project Country"
                                className={classes.textField}
                                value={this.state.country}
                                required
                                onChange={this.handleChange('country')}
                                margin="normal"
                            />
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