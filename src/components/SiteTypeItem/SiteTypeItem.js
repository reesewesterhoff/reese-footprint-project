import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Tooltip from '@material-ui/core/Tooltip';
// import Zoom from '@material-ui/core/Zoom';


const styles = {
    card: {
        marginTop: 15,
        width: 260,
        height: 335,
        textAlign: 'center',
        backgroundColor: 'AliceBlue',
    },
    icon: {
        margin: 2,
        fontSize: 50,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        margin: 'auto',
    },
};

class SiteTypeItem extends Component {

    componentDidMount() {
        
    }

    render() {

        const { classes } = this.props;

        return (
            
            <div className="toolTip">
                <span className="toolTipText">{this.props.site.description}</span>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography>
                            {this.props.icon}
                        </Typography>
                        {/* <br /> */}
                        <Typography variant="h6">
                            <strong>{this.props.site.type}</strong>
                        </Typography>
                        <br />
                        <div>
                            <p className="siteDescription">Power Needs: {this.props.site.power_need} kWh/day</p>
                            <p className="siteDescription">Panel Array: {this.props.site.solar_panel} kW</p>
                            <p className="siteDescription">Storage: {this.props.site.battery_bank} kWh</p>
                            {
                                this.props.site.generator ?
                                    <p className="siteDescription">Generator: {this.props.site.generator} kW</p>
                                    :
                                    <p className="siteDescription">Generator: None</p>
                            }
                        </div>
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