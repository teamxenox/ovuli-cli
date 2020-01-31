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
    .format('MMM');
};

const prettyPrint = result => {
  // Text + chalk definitions
  const data = {
    ovuliHeading: chalk.cyan.bold('              Ovuli'),
    labelFertile: chalk.green.bold('       Fertile Window:'),
    labelApproxOvulation: chalk.blue.bold('Approximate Ovulation:'),
    labelNextPeriod: chalk.yellow.bold('          Next Period:'),
    labelPregnancyTestDay: chalk.magenta.bold('   Pregnancy Test Day:'),
    fertileMonth: chalk.white.italic(
      `${getFormattedMonth(result.fertileWindow.startMonth)}`
    ),
    approxOvulationMonth: chalk.white.italic(
      `${getFormattedMonth(result.approximateOvulationDate.month)}`
    ),
    nextPeriodMonth: chalk.white.italic(
      `${getFormattedMonth(result.nextPeriodDate.month)}`
    ),
    pregnancyTestMonth: chalk.white.italic(
      `${getFormattedMonth(result.nextPregnancTestDate.month)}`
    ),
    fertileDetail: chalk.white.bold(
      `${result.fertileWindow.start}-${result.fertileWindow.end}`
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
  const fertile = `${data.labelFertile} ${data.fertileDetail} ${data.fertileMonth}`;
  const approxOvulation = `${data.labelApproxOvulation} ${data.approxOvulationDay} ${data.approxOvulationMonth}`;
  const nextPeriod = `${data.labelNextPeriod} ${data.nextPeriodDay} ${data.nextPeriodMonth}`;
  const pregnancyTestDay = `${data.labelPregnancyTestDay} ${data.pregnancyTestDay} ${data.pregnancyTestMonth}`;

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

  console.log(chalk.yellow(boxen(output, options)));
};

module.exports = { prettyPrint };
