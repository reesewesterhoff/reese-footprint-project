import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
        marginTop: 20,
        width: 260,
        height: 275,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        margin: 'auto',
    },
}


class SiteTypeCategoryCard extends Component {


    render() {

        const { classes } = this.props;

        return(
            <div>
                <Card className={classes.card} style={this.props.color} onClick={this.props.toggleColor}>
                    <CardContent>
                        <Typography>
                            <br />
                            {this.props.icon}
                        </Typography>
                        <Typography variant="h5">
                            <br />
                            {this.props.title}
                        </Typography>
                        <br />
                    </CardContent>
                    <CardActions>
                        <div className={classes.button}>
                            <Button      
                                size="large" 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => this.props.selectSiteCategory(this.props.title)}
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

SiteTypeCategoryCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SiteTypeCategoryCard);