#! /usr/bin/env node

const program = require('commander')
const packageJson = require("../package.json")

program
  .version(packageJson.version)
  .command("create <app-name>")
  .description("create a new project")
  .option("--f, --force", "overwrite target directory if it exist") // 是否强制创建，当文件夹已经存在
  .action((name, options) => {
    
    require('../lib/create.js').default(name,options);

  })
// 拿到命令行参数
program.parse(process.argv)