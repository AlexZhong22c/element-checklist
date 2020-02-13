#!/usr/bin/env node
const exec = require("child_process").execSync;
const program = require("commander");
const pkg = require("../package.json");
const path = require("path");
program.version(pkg.version);

program.command("serve").action(function() {
  process.chdir(path.join(__dirname, ".."));
  exec("npm run serve", { stdio: "inherit" });
});

program.command("*").action(function() {
  console.log("i am run");
});

program.parse(process.argv);
