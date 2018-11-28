import React, { Component } from 'react';
// material ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// modal appears in middle of screen
function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// jss styles
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },
});

class FloatingModal extends Component {
  state = {
    open: this.props.modalOpen,
  };

  render() {
    // need this to use jss styles
    const { classes } = this.props;

    return (
      <span>
        {/* uses props to define button features */}
        <Button
          className={classes.button}
          onClick={this.props.handleModalToggle}
          variant="contained"
          color={this.props.color}
          classes={{label: this.props.classes.label}}
        >
          {this.props.buttonText}
        </Button>
        {/* when modal is opened */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.modalOpen}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {this.props.title}
            </Typography>
            <br />
            <form>
              <div>
                <TextField
                  type="text"
                  label="Name"
                  variant="outlined"
                  value={this.props.state.name}
                  onChange={this.props.handleChangeFor('name')}
                />
              </div>
              <br />
              <div>
                <TextField
                  type="text"
                  label="Email Address"
                  variant="outlined"
                  value={this.props.state.email}
                  onChange={this.props.handleChangeFor('email')}
                />
              </div>
              <br />
              <div>
                <TextField
                  type="text"
                  label="Message"
                  variant="outlined"
                  multiline
                  value={this.props.state.message}
                  onChange={this.props.handleChangeFor('message')}
                />
              </div>
              <br />
              <Button
                color={this.props.color}
                variant="outlined"
                onClick={this.props.handleSubmit(this.props.subject)}
              >
                Submit
            </Button>
            </form>
          </div>
        </Modal>
      </span>
    );
  }
}

// needed to use jss styles
FloatingModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingModal);