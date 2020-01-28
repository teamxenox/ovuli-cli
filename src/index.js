#! /usr/bin/env node

const program = require("commander");

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
