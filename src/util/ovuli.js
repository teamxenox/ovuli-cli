'use strict'

const moment = require('moment');
/**
 * This is a function to caluclate female different ovuli days.
 * @param {string} lastPeriodDate -  Day of female's last period.
 * @param {string} averageCycleDay - Average cycle days of females.
 *
 */
const calculateOvuli = (lastPeriodDate, averageCycleDay) => {
   return new Promise( (resolve, reject) =>{
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
    
    
        // To calculate Fertile window
        result['fertileWindow']['start'] = moment(approximateOvulationDate).subtract(3, 'days').format('DD');
        result['fertileWindow']['end'] = moment(approximateOvulationDate).add(1, 'days').format('DD');
        result['fertileWindow']['startMonth'] = moment(approximateOvulationDate).subtract(3, 'days').format('MM');
        
        resolve(result);
    })
}

/**
 * This is a function to caluclate female different ovuli days.
 * @param {string} cycles -  Array of female's last `n` numbers of periods's first days.
 * 
 *  
 */

//  To calculate average Cycle days of female 
const calculateAverageCycle = (cycles) => {

   return new Promise( (resolve, reject) =>{
        let totalCycleDays = 0;
    
    
        for (let index = 1; index < cycles.length; index++) {
            let start = moment(cycles[index-1]).format('YYYY-MM-DD');
            let end = moment(cycles[index]).format('YYYY-MM-DD');
    
            // If you are using moment.js you can do it easily.
    
            start = moment(start, "YYYY-MM-DD");
            end = moment(end, "YYYY-MM-DD");
    
            //Difference in number of days
            let duration = moment.duration(start.diff(end)).asDays();    
            totalCycleDays = totalCycleDays + duration;
        }
        let averageCycleDay = totalCycleDays / (cycles.length - 1);
        resolve(averageCycleDay)
    });
}

module.exports = {
    calculateOvuli,
    calculateAverageCycle
}
