import React, { Component } from 'react';

class SiteTypeItem extends Component {

    render() {
        return (
            <div>
                <div height="400" width="300" style={{backgroundColor: 'beige'}}>
                    <h3>{this.props.site.type}</h3>
                    <h5>Power Needs: {this.props.site.power_need} kWh/day</h5>
                    <h5>Storage: {this.props.site.battery_bank} kWh</h5>
                    <p>{this.props.site.description}</p>
                    <button onClick={() => this.props.selectSite(this.props.site)}>Select This Site</button>
                </div>
            </div>
        );
    }
}

export default SiteTypeItem;