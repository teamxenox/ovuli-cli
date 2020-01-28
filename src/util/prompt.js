"use strict";

// Native import
const inquirer = require("inquirer");

inquirer.registerPrompt("datetime", require("inquirer-datepicker-prompt"));

/**
 * This is a function to get first day of the last periods
 * @param null - null
 * @returns {Promise} The promise with the date
 */

const lastDate = () => {
  return inquirer.prompt([
    {
      type: "datetime",
      name: "lastDate",
      message: "😔 Enter the first day of your last periods (DD/MM/YY):",
      format: ["d", "/", "m", "/", "yy"]
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
      type: "input",
      name: "averageCycle",
      message: "🗓  How long is your average cycle (in Days)?:",
      validate: input => {
        if (isNaN(input)) return false, "Please enter just number";
        input = Number(input);
        if (20 <= input && input < 41) return true;
        else return false, "Average cycle is mostly between 20 to 40 days";
      }
    }
  ]);
};

module.exports = { lastDate, averageCycle };
