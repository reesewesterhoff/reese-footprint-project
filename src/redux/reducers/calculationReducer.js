import moment from 'moment';

const dieselCalculation = (state = {}, action) => {
    switch (action.type) {
        case 'RUN_DIESEL_CALCULATION':
            let _start = moment(action.payload[0].fundStartDate);
            let _end = moment(action.payload[0].fundEndDate);
            let _duration = Number(_end.diff(_start, 'months'));
            let dieselCost = 0;
            for (let i = 0; i < action.payload[0].siteGenerators.length; i++) {
                dieselCost += Number(action.payload[0].siteGenerators[i].monthlyCost);
            }
            let totalDieselCost = Number(_duration * dieselCost);
            return {totalDieselCost: totalDieselCost};
        default:
            return state;
    }
}

export default dieselCalculation;