#! /usr/bin/env node
'use strict';

const program = require('commander');
const {
  calculateOvuli,
  calculateAverageCycle,
  compareDate
} = require('./util/ovuli');
const prompt = require('../src/util/prompt');
const helper = require('../src/util/helper');
const { prettyPrint } = require('./util/output');
const fs = require('fs');

program.version('0.0.1');

if (!process.argv.slice(2).length) {
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
}

program
  .command('save')
  .alias('s')
  .action(() => {
    prompt.lastDate().then(lastDate => {
      prompt.askAverageCycle().then(result => {
        if (result.askAverageCycle) {
          prompt.averageCycle().then(averageCycle => {
            const result = calculateOvuli(lastDate, averageCycle);
            helper.saveData(lastDate, result);
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

            helper.saveData(lastDate, result);
            prettyPrint(result);
          });
        }
      });
    });
  });

program
  .command('check')
  .alias('c')
  .action(() => {
    fs.readFile('./data.json', 'utf8', (err, jsonData) => {
      if (err) {
        console.log('You have not previosly stored any data 😭');
        return;
      }

      let previousData = JSON.parse(jsonData).previousData;

      if (compareDate(previousData.nextPeriodDate)) {
        console.log(
          'It looks like you have not updated your latest period date'
        );

        prompt.lastDate().then(lastDate => {
          prompt.askAverageCycle().then(result => {
            if (result.askAverageCycle) {
              prompt.averageCycle().then(averageCycle => {
                const result = calculateOvuli(lastDate, averageCycle);

                helper.appendData(jsonData, lastDate, result);

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

                helper.appendData(jsonData, lastDate, result);

                prettyPrint(result);
              });
            }
          });
        });
      } else {
        prettyPrint(previousData);
      }
    });
  });

program.parse(process.argv);
// ovuli.calculateAverageCycle(['2020-01-25T11:12:25.338Z', '2020-01-13T11:12:25.338Z', '2020-01-01T11:12:25.338Z']);
