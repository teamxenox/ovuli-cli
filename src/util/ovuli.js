const moment = require('moment');
/**
 * This is a function to caluclate female different ovuli days.
 * @param {string} lastPeriodDate -  Day of female's last period.
 * @param {string} averageCycleDay - Average cycle days of females.
 * 
 */

const calculateOvuli = (lastPeriodDate, averageCycleDay) => {
    console.log(lastPeriodDate);
    let result = {
        approximateOvulationDate: { day: '', month: '' },
        nextPeriodDate: { day: '', month: '' },
        nextPregnancTestDate: { day: '', month: '' },
        fertileWindow: { start: '', startMonth: '', end: '' }
    }

    // To calculate period date
    result['nextPeriodDate']['day'] = moment(lastPeriodDate).add(averageCycleDay - 1, "days").format('DD');
    result['nextPeriodDate']['month'] = moment(lastPeriodDate).add(averageCycleDay - 1, "days").format('MM');

    // To calculate next pregnancy date
    result['nextPregnancTestDate']['day'] = moment(lastPeriodDate).add(averageCycleDay, "days").format('DD');
    result['nextPregnancTestDate']['month'] = moment(lastPeriodDate).add(averageCycleDay, "days").format('MM');

    // To calculate approximate ovulation
    let maxOvulationDays = 26;
    let currentPregnancyCycle = 40 - averageCycleDay;
    let ovulationDays = maxOvulationDays - currentPregnancyCycle - 1;

    approximateOvulationDate = moment(lastPeriodDate).add(ovulationDays, "days");

    result['approximateOvulationDate']['day'] = approximateOvulationDate.format('DD');
    result['approximateOvulationDate']['month'] = approximateOvulationDate.format('MM');
   
   
    // let fertileWindowRange = moment(approximateOvulationDate).subtract(3, 'days').format('YYYY-MM-DD')
    //     + " - " + moment(approximateOvulationDate).add(1, 'days').format('YYYY-MM-DD');
    
    // To calculate Fertile window
    result['fertileWindow']['start'] = moment(approximateOvulationDate).subtract(3, 'days').format('DD');
    result['fertileWindow']['end'] = moment(approximateOvulationDate).add(1, 'days').format('DD');
    result['fertileWindow']['startMonth'] = moment(approximateOvulationDate).subtract(3, 'days').format('MM');

    return result
}

module.exports = {
    calculateOvuli
}