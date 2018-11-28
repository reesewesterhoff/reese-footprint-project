import React, { Component } from 'react';
// connect to redux state
import { connect } from 'react-redux';
// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// for routing
import { withRouter } from 'react-router-dom';
// css
import './AddProject.css'

// jss styles
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
        image_url: ''
    }

    // handles adding a project for logged in users
    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_PROJECT', payload: this.state
        });
        this.setState({
            projectName: '',
        });
        this.props.history.push('/dashboard')
    } // end handleSubmit

    // handles changes in input boxes 
    handleChange = property => event => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    } // end handleChange

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
                                label="Image URL"
                                className={classes.textField}
                                value={this.state.image_url}
                                onChange={this.handleChange('image_url')}
                                margin="normal"
                            />
                            <Button 
                                value="submit" 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                            >
                                Add Project
                            </Button>
                        </form>
                        <div id="bugSpacing"></div>
                </div>

            );
    }
}

// access to redux state
const mapStateToProps = state => ({
    state: state,
    user: state.user,
});

// needed for jss styles
AddProject.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(connect(mapStateToProps)(AddProject)));