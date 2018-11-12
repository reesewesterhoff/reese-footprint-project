import React, { Component } from 'react';
import SiteTypeItem from '../SiteTypeItem/SiteTypeItem';
import { connect } from 'react-redux';
import SiteTypeCategory from '../SiteTypeCategory/SiteTypeCategory';


class SiteTypeList extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SITE_TYPES'});   
    }

    selectSite = (site) => {
        console.log('clicked site', site);
        this.props.dispatch({type: 'SET_SELECTED_SITE', payload: site});
    }

    render() {
        return (
            <div>
                <h1>Choose Site Category And Type</h1>
                <div>
                    <SiteTypeCategory />
                </div>
                {this.props.siteTypes.map(site => {
                    return  <SiteTypeItem 
                                site={site}
                                key={site.id}
                                selectSite={this.selectSite}
                            />
                    }      
                )}

            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        siteTypes: state.siteTypes,
    }
}

export default connect(mapStateToProps)(SiteTypeList);