const path = require("path");
const exec = require("child_process").exec;
const chalk = require("chalk");
const fse = require("fs-extra");
const inquirer = require("inquirer");
const ora = require("ora");
const { resolve } = path;
chalk.level = 3;

module.exports.default = function (name, options) {
  const spinner = ora("loading");
  const _path = process.cwd();
  const projectPath = resolve(_path, `./${name}`);

  // 远程下载模板文件
  function gitCloneTempl() {
    spinner.start();
    exec(
      `git clone https://github.com/chengxm/common-utils.git ` + projectPath,
      (error, stdout, stderr) => {
        spinner.stop(); // 停止

        if (error) {
          // 当有错误时打印出错误并退出操作
          spinner.fail(error); // 成功 ✔
          console.log(chalk.red(error));
          process.exit();
        }
        spinner.succeed("Loading succeed"); // 成功 ✔
        console.log(chalk.green("初始化完成"));
        process.exit(); // 退出这次命令行操作
      }
    );
  }

  // 判断文件目录是否存在
  fse.pathExists(projectPath, (err, exists) => {
    if (err) {
      console.log(chalk.red(err));
      process.exit(); // 退出这次命令行操作
    }
    if (exists) {
      // 判断是否强制覆盖
      if (options.force) {
        fse.removeSync(projectPath);
        gitCloneTempl();
        return true;
      } else {
        // 不强制更新就询问
        let question = [
          {
            name: "yesOrNO", // 问题对应的属性
            type: "input", // 问题类型为填空题
            message: "文件已经存在,是否覆盖(yes,no)", // 问题描述
            validate(val) {
              if (!val) {
                return chalk.red("answers is required!");
              }

              return true;
            },
          },
        ];
        inquirer.prompt(question).then((answers) => {
          const { yesOrNO } = answers;
          if (yesOrNO === "yes") {
            fse.removeSync(projectPath);
            gitCloneTempl();
          } else {
            console.log(chalk.green("Folder has already existed!"));
            process.exit(); // 退出这次命令行操作
          }
        });
      }
      return true;
    } else {
      gitCloneTempl();
      return true;
    }
  });
};
