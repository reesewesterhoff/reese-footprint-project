import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';


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

class SiteTypeItem extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography>
                            <LocalHospitalIcon className={classes.icon} />
                        </Typography>
                        <Typography variant="h5">
                            {this.props.site.type}
                        </Typography>
                        <br />
                        <Typography>
                            Power Needs: {this.props.site.power_need} kWh/day
                            Storage: {this.props.site.battery_bank} kWh
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button
                                size="large"
                                variant="outlined"
                                color="primary"
                                onClick={() => this.props.selectSite(this.props.site)}
                            >
                                Select This Site
                            </Button>
                        </div>
                    </CardActions>
                    <br />
                </Card>
            </div>
        );
    }
}

SiteTypeItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SiteTypeItem);