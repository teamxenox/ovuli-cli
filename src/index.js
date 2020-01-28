#! /usr/bin/env node

const program = require("commander");
// const ovuli = require('./util/ovuli');
// console.log(ovuli.calculateOvuli('2020-01-01T11:12:25.338Z', 27))
const prompt = require("../src/util/prompt");
program.version("0.0.1");

program
  .command("start")
  .alias("s")
  .action(() => {
    prompt.lastDate().then(lastDate => {
      prompt.averageCycle().then(averageCycle => {
        console.log(averageCycle, lastDate);
      });
    });
  });

program.parse(process.argv);
