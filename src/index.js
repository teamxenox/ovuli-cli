#! /usr/bin/env node
'use strict';

const program = require('commander');
const { calculateOvuli, calculateAverageCycle } = require('./util/ovuli');
const prompt = require('../src/util/prompt');
const { prettyPrint } = require('./util/output');
program.version('0.0.1');

program
  .command('start')
  .alias('s')
  .action(() => {
    prompt.lastDate().then(lastDate => {
      prompt.askAverageCycle().then(result => {
        if (result.askAverageCycle) {
          prompt.averageCycle().then(averageCycle => {
            const result = calculateOvuli(lastDate, averageCycle);
            prettyPrint(result);
          });
        } else {
          prompt.calculateAverageCycle().then(averageCycle => {
            const { lastDate: lastDateDate } = lastDate;
            const { secondLastDate, thirdLastDate } = averageCycle;
            const averageCycleDates = [
              lastDateDate,
              secondLastDate,
              thirdLastDate
            ];
            const calculatedAverageCycle = calculateAverageCycle(
              averageCycleDates
            );
            const result = calculateOvuli(lastDate, {
              averageCycle: calculatedAverageCycle
            });
            prettyPrint(result);
          });
        }
      });
    });
  });

program.parse(process.argv);
// ovuli.calculateAverageCycle(['2020-01-25T11:12:25.338Z', '2020-01-13T11:12:25.338Z', '2020-01-01T11:12:25.338Z']);
