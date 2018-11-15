import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProjectPage.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    marginTop: 40,
    width: 250,
    height: 320,
    textAlign: 'center',
    backgroundColor: 'goldenrod',
  },
  icon: {
    margin: 2,
    fontSize: 60,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    margin: 'auto',
  },
};

class ProjectPage extends Component {


  render() {

    const { classes } = this.props;

    return (
      <div>

        <h1 className="projectHeader">Project</h1>
        <div className="siteCard">
          <Card className={classes.card} >
            <a href='http://localhost:3000/#/saved_site'>
              <CardContent>
                <Typography>
                  <img
                    src="http://www.uhhospitals.org/~/media/UH/Images/locations/uh-chagrin-highlands-health-center.jpg"
                    alt="hospital"
                    className={classes.icon} />
                </Typography>
                <Typography variant="h5">
                  Urgent Care Clinic
                        </Typography>
                <br />
                <Typography>
                  Power Needs: 10kWh/day
                  Storage:  30kWh
                        </Typography>
              </CardContent>
            </a>
          </Card>
        </div>
      </div>
    );
  }
}

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state,
});

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(ProjectPage);
export default withStyles(styles)(connect(mapStateToProps)(ProjectPage));