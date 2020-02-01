'use strict';

// Native import
const inquirer = require('inquirer');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

/**
 * This is a function to get first day of the last periods
 * @param null - null
 * @returns {Promise} The promise with the date
 */

const lastDate = () => {
  return inquirer.prompt([
    {
      type: 'datetime',
      name: 'lastDate',
      message: '😔 Enter the first day of your last periods (DD/MM/YY):',
      format: ['d', '/', 'm', '/', 'yy']
    }
  ]);
};

/**
 * This is a function to get first day of the last periods
 * @param null - null
 * @returns {Promise} The promise with the date
 */

const askAverageCycle = () => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'askAverageCycle',
      message: '🧐 Do you know your average cycle (in Days)?:'
    }
  ]);
};

/**
 * This is a function to get first day of the last periods
 * @param null - null
 * @returns {Promise} The promise with the date
 */

const averageCycle = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'averageCycle',
      message: '🗓  How long is your average cycle (in Days)?:',
      validate: input => {
        if (isNaN(input)) return false, 'Please enter just number';
        input = Number(input);
        if (20 <= input && input < 41) return true;
        else return false, 'Average cycle is mostly between 20 to 40 days';
      }
    }
  ]);
};

/**
 * This is a function to get first day of the last periods
 * @param null - null
 * @returns {Promise} The promise with the date
 */

const calculateAverageCycle = () => {
  return inquirer.prompt([
    {
      type: 'datetime',
      name: 'secondLastDate',
      message: '😖 Enter the first day of your Second last periods (DD/MM/YY):',
      format: ['d', '/', 'm', '/', 'yy']
    },
    {
      type: 'datetime',
      name: 'thirdLastDate',
      message: '☹️  Enter the first day of your Third Last periods (DD/MM/YY):',
      format: ['d', '/', 'm', '/', 'yy']
    }
  ]);
};

module.exports = {
  lastDate,
  askAverageCycle,
  calculateAverageCycle,
  averageCycle
};
