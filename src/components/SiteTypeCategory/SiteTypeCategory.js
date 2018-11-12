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
        width: 350,
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


    render() {

        const { classes } = this.props;

        return (
            <div className={classes.cardDiv}>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography>
                            <br />
                            <LocalHospitalIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h4">
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
                                // onClick={() => this.props.selectSiteCategory('emergency/medical')}
                                >
                                Select
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography>
                            <br />
                            <BusinessCenterIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h4">
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
                                // onClick={() => this.props.selectSiteCategory('office/storage')}
                                >
                                Select
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography>
                            <br />
                            <RestaurantIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h4">
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
                                // onClick={() => this.props.selectSiteCategory('food/water/shelter')}
                                >
                                Select
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography>
                            <br />
                            <RouterIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h4">
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
                                // onClick={() => this.props.selectSiteCategory('communications')}
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