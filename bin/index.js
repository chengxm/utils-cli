#! /usr/bin/env node

const program = require('commander')
const packageJson = require("../package.json")
const chalk = require('chalk')
const inquirer = require('inquirer')
const path = require("path");
const exec = require('child_process').exec;
chalk.level = 3

const { resolve } = path;
program
  .version(packageJson.version)
  .command("create <app-name>")
  .description("create a new project")
  .option("--f, --force", "overwrite target directory if it exist") // 是否强制创建，当文件夹已经存在
  .action((name, options) => {
     // 文本样式
     console.log("project name is " + chalk.bold(name))

     // 颜色
     console.log("project name is " + chalk.cyan(name))
     console.log("project name is " + chalk.green(name))
 
     // 背景色
     console.log("project name is " + chalk.bgRed(name))
 
     // 使用RGB颜色输出
     console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
     console.log("project name is " + chalk.hex('#049CDB').bold(name));
     console.log("project name is " + chalk.bgHex('#049CDB').bold(name))



     let question = [

      {
          name: 'name',// 问题对应的属性
          type: 'input',// 问题类型为填空题
          message: '请输入模板名称', // 问题描述
          validate(val) {
              if (!val) {
                  return chalk.red('name is required!')
              }
  
              // else if (templateList[val]) {
              //     return 'Folder has already existed!'
              // }
  
              else {
  
                  return true
              }
          }
  
      }
  ]
  inquirer.prompt(question).then((answers) =>{
      const {name} = answers;

      const _path = process.cwd();
      const projectPath = resolve(_path, `/${name}`);
  //从git下载到本地指定路径
  exec(`git clone https://github.com/chengxm/common-utils.git ` + projectPath, (error, stdout, stderr) => {
      if (error)  {
          // 当有错误时打印出错误并退出操作
          console.log(chalk.red(error))
           process.exit()
      }
  
      console.log(chalk.green('初始化完成'))
      process.exit() // 退出这次命令行操作
  })
  })

  })
// 拿到命令行参数
program.parse(process.argv)