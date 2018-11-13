import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RouterIcon from '@material-ui/icons/Router';

// jss styles
const styles = {
    card: {
        marginTop: 75,
        width: 280,
        maxHeight: 400,
        textAlign: 'center',
    },
    pos: {
        marginBottom: 12,
    },
    icon: {
        margin: 2,
        fontSize: 100,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        margin: 'auto',
    },
    cardDiv: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    }
};

class SiteTypeCategory extends Component {

    state = {
        active: null,
    }

    toggleColor = (position) => {
        if (this.state.active === position) {
          this.setState({active : null})
        } else {
          this.setState({active : position})
        }
      }
      
      myColor = (position) => {
        if (this.state.active === position) {
          return "LawnGreen";
        }
        return "";
      }


    render() {

        const { classes } = this.props;

        return (
            <div className={classes.cardDiv}>
                <Card className={classes.card} style={{background: this.myColor(0)}} onClick={() => {this.toggleColor(0)}}>
                    <CardContent>
                        <Typography>
                            <br />
                            <LocalHospitalIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h5">
                            <br />
                            Medical/Emergency
                        </Typography>
                        <br />
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button      
                                size="large" 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => this.props.selectSiteCategory('emergency/medical')}
                                >
                                Select
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
                <Card className={classes.card} style={{background: this.myColor(1)}} onClick={() => {this.toggleColor(1)}}>
                    <CardContent>
                        <Typography>
                            <br />
                            <BusinessCenterIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h5">
                            <br />
                            Office/Storage
                        </Typography>
                        <br />
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button                                
                                size="large" 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => this.props.selectSiteCategory('office/storage')}
                                >
                                Select
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
                <Card className={classes.card} style={{background: this.myColor(2)}} onClick={() => {this.toggleColor(2)}}>
                    <CardContent>
                        <Typography>
                            <br />
                            <RestaurantIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h5">
                            <br />
                            Food/Water/Shelter
                        </Typography>
                        <br />
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button                  
                                size="large" 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => this.props.selectSiteCategory('food/water/shelter')}
                                >
                                Select
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
                <Card className={classes.card} style={{background: this.myColor(3)}} onClick={() => {this.toggleColor(3)}}>
                    <CardContent>
                        <Typography>
                            <br />
                            <RouterIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h5">
                            <br />
                            Communications
                        </Typography>
                        <br />
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button                    
                                size="large" 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => this.props.selectSiteCategory('communications')}
                                >
                                Select
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
            </div>
        );
    }
}

SiteTypeCategory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SiteTypeCategory);