import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

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

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_PROJECT', payload: this.state
        });
        this.setState({
            projectName: '',
            country: '',
        });
        this.props.history.push('/dashboard')
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
                        <form onSubmit={this.handleSubmit} >
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
                            <Button value="submit" type="submit" variant="contained" color="primary" className={classes.button}>
                                Add Project
                            </Button>
                        </form>
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

export default withRouter(withStyles(styles)(connect(mapStateToProps)(AddProject)));