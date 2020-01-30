const chalk = require('chalk');
const boxen = require('boxen');
const moment = require('moment');

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round'
};

const getFormattedMonth = month => {
  const monthIndex = month - 1;
  return moment()
    .month(monthIndex)
    .format('MMMM');
};

const prettyPrint = result => {
  // Text + chalk definitions
  const data = {
    ovuliHeading: chalk.white.bold('          Ovuli Calculator'),
    labelFertile: chalk.white.bold('       Fertile Window:'),
    labelApproxOvulation: chalk.white.bold('Approximate Ovulation:'),
    labelNextPeriod: chalk.white.bold('          Next Period:'),
    labelPregnancyTestDay: chalk.white.bold('   Pregnancy Test Day:'),
    fertileMonth: chalk.white(
      `${getFormattedMonth(result.fertileWindow.startMonth)}`
    ),
    approxOvulationMonth: chalk.white(
      `${getFormattedMonth(result.approximateOvulationDate.month)}`
    ),
    nextPeriodMonth: chalk.white(
      `${getFormattedMonth(result.nextPeriodDate.month)}`
    ),
    pregnancyTestMonth: chalk.white(
      `${getFormattedMonth(result.nextPregnancTestDate.month)}`
    ),
    fertileDetail: chalk.white.bold(
      `${result.fertileWindow.start} - ${result.fertileWindow.end}`
    ),
    approxOvulationDay: chalk.white.bold(
      `${result.approximateOvulationDate.day}`
    ),
    nextPeriodDay: chalk.white.bold(`${result.nextPeriodDate.day}`),
    pregnancyTestDay: chalk.white.bold(`${result.nextPregnancTestDate.day}`)
  };

  // Actual strings we're going to output
  const newline = '\n';
  const heading = `${data.ovuliHeading}`;
  const fertile = `${data.labelFertile} ${data.fertileMonth} ${data.fertileDetail}`;
  const approxOvulation = `${data.labelApproxOvulation} ${data.approxOvulationMonth} ${data.approxOvulationDay}`;
  const nextPeriod = `${data.labelNextPeriod} ${data.nextPeriodMonth} ${data.nextPeriodDay}`;
  const pregnancyTestDay = `${data.labelPregnancyTestDay} ${data.pregnancyTestMonth} ${data.pregnancyTestDay}`;

  // Put all our output together into a single variable so we can use boxen effectively
  const output =
    heading + // data.name + data.handle
    newline +
    newline +
    fertile +
    newline +
    approxOvulation +
    newline +
    nextPeriod +
    newline +
    pregnancyTestDay +
    newline;

  console.log(chalk.green(boxen(output, options)));
};

module.exports = { prettyPrint };
