#! /usr/bin/env node

const program = require("commander");
const ovuli = require("./util/ovuli");
const prompt = require("../src/util/prompt");
program.version("0.0.1");

program
  .command("start")
  .alias("s")
  .action(() => {
    prompt.lastDate().then(lastDate => {
      prompt.askAverageCycle().then(result => {
        if (result.askAverageCycle) {
          prompt.averageCycle().then(averageCycle => {
            console.log(averageCycle, lastDate);
          });
        } else {
          prompt.calculateAverageCycle().then(calculateAverageCycle => {
            console.log(calculateAverageCycle, lastDate);
          });
        }
      });
    });
  });

program.parse(process.argv);
