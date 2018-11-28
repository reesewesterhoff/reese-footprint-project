import moment from 'moment';

const dieselCalculation = (state = {}, action) => {
    switch (action.type) {
        case 'RUN_DIESEL_CALCULATION':
            let _start = moment(action.payload.sites[0].fundStartDate);
            let _end = moment(action.payload.sites[0].fundEndDate);
            let _duration = Number(_end.diff(_start, 'months'));
            let dieselCost = 0;
            for (let i = 0; i < action.payload.sites[0].siteGenerators.length; i++) {
                dieselCost += Number(action.payload.sites[0].siteGenerators[i].monthlyCost);
            }
            let totalDieselCost = Number(_duration * dieselCost);
            return {totalDieselCost: totalDieselCost, 
                timeToPayOff: action.payload.timeToPayOff,
                payOffDate: action.payload.payOffDate, 
                payOffInTime: action.payload.payOffInTime,
                timeline: action.payload.timeline
            };
        case 'UNSET_USER':
          return {};
        default:
            return state;
    }
}

export default dieselCalculation;