import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    button: {
        width: '100%',
        margin: 'auto',
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
        height: '20vmin',
    },
});

class UserDashboard extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PROJECTS', payload: { id: this.props.user.id } });
        this.props.dispatch({ type: 'FETCH_ALL_SITE_TYPES' });
    }

    selectProject = (id) => {
        this.props.dispatch({ type: 'SELECT_PROJECT', payload: id })
        console.log('project id:', id);
        
        this.props.dispatch({ type: 'GET_PROJECT', payload: id })
        this.props.dispatch({ type: 'GET_SITES_BY_PROJECT', payload: id })
        this.props.history.push('/project')
        
    }

    handleAddProject = () => {
        this.props.history.push('/add_project')
    }


    render() {

        const defaultImage = 'http://vibrance.co/clarity/img/Project-Icon.png';

        const { classes } = this.props;

        return (

            <div>
                <h1 className="heading">Dashboard</h1>
                <h2 className="subHeading">Projects 
                    <br></br>
                    <br></br>
                    <Button  
                    onClick={this.handleAddProject}
                    size="large"
                    variant="contained"
                    color="primary">
                    Add Project
                    </Button>
                </h2>
                <div>
                    <div>
                        
                    </div>
                    {!this.props.projects.length ? <h3 className="heading">Add a project to get started!</h3> 
                    
                    :
                        <div>
                    <div className={classes.cardDiv}>
                        {this.props.projects.map((project,index) =>
                            <Card className={classes.card} key={index}>

                                <CardMedia
                                    className={classes.media}
                                    image={project.image || defaultImage}
                                    title={project.name}
                                />
                                <CardContent>
                                    <Typography variant="h5">
                                        {project.name}
                                    </Typography>
                                    {/* <br /> */}
                                </CardContent>
                                <CardActions>
                                    <div className={classes.button}>
                                        <Button
                                            size="medium"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => this.selectProject(project.id)}
                                        >
                                            Select Project
                                        </Button>
                                    </div>
                                </CardActions>
                            </Card>
                        )}
                    </div>

                        </div>}


                </div>
                    <div id="bugSpacing"></div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    projects: state.projectsReducer,
});

UserDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(UserDashboard));