import React, {Component} from 'react';

class AddSite extends Component{

    state ={
        siteName: '',
        siteLocation: '',
        fundStartDate: '',
        fundEndDate: '',
        monthlyBudget: '',
    }

    handleChange = (property) => (event) =>{
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        
    }

    render(){
        return (
            <div>
                <h1>Add Site</h1>

                <p>
                This is a calculator that allows you to input your site information 
                to do a cost-benefit comparison of using diesel energy generators 
                to solar alternatives.
                </p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Site Name" value={this.state.siteName} onChange={this.handleChange('siteName')} />
                    </label>
                    <label>
                      
                        <input type="text" placeholder="Site Location" value={this.state.siteLocation} onChange={this.handleChange('siteLocation')}/>
                    </label>
                    <label>
                       
                        <input type="text"  placeholder="Funding Start Date" value={this.state.fundStartDate} onChange={this.handleChange('fundStartDate')}/>
                    </label>
                    <label>
                    
                        <input type="text" placeholder="Funding End Date" value={this.state.fundEndDate} onChange={this.handleChange('fundEndDate')}/>
                    </label>
                    <label>

                        <input type="text" placeholder="Monthly Budget" value={this.state.monthlyBudget} onChange={this.handleChange('monthlyBudget')}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }
}

export default AddSite;