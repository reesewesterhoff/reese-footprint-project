import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        maxWidth: 150,
      },
      media: {
        height: 140,
      },
});

class ProjectPage extends Component {

    // componentDidMount() {
    //     this.props.dispatch({ type: 'GET_PROJECTS', payload: { id: this.props.user.id } });
    // }

    render() {


        const { classes } = this.props;

        return (

            <div>
                <h1 className="heading">Dashboard</h1>
                <h2 className="subHeading">Projects</h2>
                <div>
                    {!this.props.sitesByProject ? <p>loading...</p> : 
                    <div>


                    </div>}
                        {this.props.sitesByProject.map((site,index) => 
                            <Card className={classes.card} >
                                <CardMedia
                                    className={classes.media}
                                    // image="http://vibrance.co/clarity/img/Project-Icon.png"
                                    title="Generic Project"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {site.name}
                                    </Typography>
                                    <br />
                                    <Typography>
                                        {site.country}
                                    </Typography> 
                                </CardContent>
                            </Card>
                        )}
                    
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => ({
  sitesByProject: state.sitesByProject,
});

ProjectPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(ProjectPage));