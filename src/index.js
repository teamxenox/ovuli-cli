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
const { boxData, outputHeader, outputFooter } = require('./util/output');
const fs = require('fs');

program.version('0.0.1');

const noArguments = !process.argv.slice(2).length;

if (noArguments) {
  prompt.lastDate().then(lastDate => {
    prompt.askAverageCycle().then(result => {
      if (result.askAverageCycle) {
        prompt.averageCycle().then(averageCycle => {
          const result = calculateOvuli(lastDate, averageCycle);
          outputHeader();
          boxData(result);
          outputFooter();
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
          outputHeader();
          boxData(result);
          outputFooter();
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
            outputHeader();
            boxData(result);
            outputFooter();
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
            outputHeader();
            boxData(result);
            outputFooter();
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

                outputHeader();
                boxData(result);
                outputFooter();
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

                outputHeader();
                boxData(result);
                outputFooter();
              });
            }
          });
        });
      } else {
        outputHeader();
        boxData(previousData);
        outputFooter();
      }
    });
  });

program
  .command('data')
  .alias('d')
  .action(() => {
    fs.readFile('./data.json', 'utf8', (err, jsonData) => {
      if (err) {
        console.log('You have not previously stored any data 😭');
        return;
      } else {
        outputHeader();
        let historyData = JSON.parse(jsonData).history;
        for (var i = 0; i < historyData.length; i++) {
          boxData(historyData[i]);
        }
        outputFooter();
      }
    });
  });

program.parse(process.argv);
