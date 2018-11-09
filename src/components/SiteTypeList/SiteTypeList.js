import React, { Component } from 'react';
import SiteTypeItem from '../SiteTypeItem/SiteTypeItem';
import { connect } from 'react-redux';

class SiteTypeList extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SITE_TYPES'});
        
    }

    render() {
        return (
            <div>
                <h1>Choose Site Type</h1>
                <select>
                    <option value=''>---Select A Site---</option>
                    {this.props.sites.map(site => {
                        return <option value={site.id} key={site.id}>
                            {site.type}
                        </option>
                        }
                    )}
                    
                </select>
                
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        sites: state.sites,
    }
}

export default connect(mapStateToProps)(SiteTypeList);