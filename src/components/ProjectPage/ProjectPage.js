import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import SavedSitePage from '../SavedSitePage/SavedSitePage';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RouterIcon from '@material-ui/icons/Router';
import WavesIcon from '@material-ui/icons/Waves';
import SecurityIcon from '@material-ui/icons/Security';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
    },
    cardDiv: {
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
  },
  card: {
      width: '30vmin',
      height: '40vmin',
      margin: 10,
      textAlign: 'center',
  },
  media: {
      height: '10vmin',
  },
});

class ProjectPage extends Component {

  state = {
    currentIndex: -1,
  }

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_ALL_SITE_TYPES'});
  }

  selectSite = (index) => {
    console.log(index);
    this.setState({
      currentIndex: index,
    })
    
  }

  handleAddSite = () => {
    this.props.history.push('/add_site')
}

    render() {


        const { classes } = this.props;

        return (

            <div>
                <div>
                    {!this.props.project.length ? <p>loading...</p> : 
                    <div>
                      <h1 className="heading">{this.props.project[0].name}

                        <pre>
                          <Button  
                            onClick={this.handleAddSite}
                            size="medium"
                            variant="contained"
                            color="primary">
                            Add Site
                          </Button>

                        </pre>

                      </h1>
      


                    </div>}

                      {!this.props.sitesByProject.length ? <h4>Add a site to get started!</h4> : 
                      <div className={classes.cardDiv}>
                      
                        {this.props.sitesByProject.map((site, index) => 
                            <Card className={classes.card} key={index}>

                                <CardMedia
                                    className={classes.media}
                                    // image="http://vibrance.co/clarity/img/Project-Icon.png"
                                    title="Generic Project"
                                />
                                <CardContent>
                                    <Typography variant="h6">

                                        {site.site_name}
                                    </Typography>
                                    <br />
                                    <Typography>
                                        Energy Budget: &nbsp; {site.energy_budget}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <div className={classes.button}>
                                        <Button
                                            size="large"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => this.selectSite(index)}
                                        >
                                            Select Site
                                        </Button>
                                    </div>
                                </CardActions>
                            </Card>
                        )}
                        </div>
                        }
                        {this.state.currentIndex < 0 ? <p>Choose a site!</p> :
                        <SavedSitePage
                        index={this.state.currentIndex}
                        />}
                    
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => ({
  sitesByProject: state.sitesByProject,
  state: state,
  project: state.project
});

ProjectPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(ProjectPage));