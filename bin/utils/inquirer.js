/* eslint-disable no-undef */

const inquirer = require("inquirer");
const { loading, getRepositories, fetchTagList } = require("./index.js");
// const ora = require("ora");

// function getSpinner(projectName, license) {
//   const spinner = ora("项目生成中...").start();
//   setTimeout(() => {
//     console.log("\n项目名称:" + projectName);
//     console.log("\n版本:", license);
//     spinner.succeed("加载完毕");
//   }, 3000);
// }

module.exports = async (name) => {
  let { projectName } = await inquirer.prompt({
    // type 表示question的类型，input 表示输入
    type: "input", // input, number, confirm, list, rawlist, expand, checkbox, password, editor
    // 答案的 key
    name: "projectName",
    // 问题是什么
    message: "The project name you want create is it?",
    // 默认值
    default: name,
  });
  console.log("projectName", projectName);

  // 获取仓库列表
  let repos = await loading(getRepositories)("woow-wu7");

  // 选择仓库列表
  let { repoName } = await inquirer.prompt({
    type: "list",
    name: "repoName",
    message: "Choose a project template",
    choices: repos,
  });

  // 获取所有 branches
  let branches = await loading(fetchTagList)("woow-wu7", repoName);

  // 如果有多个分支，用户选择多个分支，没有多个分支可以直接下载
  if (branches.length > 1) {
    // 存在
    let { checkout } = await inquirer.prompt({
      type: "list",
      name: "checkout",
      message: "Choose the target version",
      choices: branches,
    });
    repoName += `#${checkout}`;
  } else {
    repoName += `#${branches[0]}`;
  }

  // let { license } = await inquirer.prompt({
  //   // 类型，list 表示可以选择
  //   type: "list",
  //   // 答案的 key
  //   name: "license",
  //   // 问题是什么
  //   message: "Choose a license",
  //   // 支持选择的选项
  //   choices: ["LGPL", "Mozilla", "GPL", "BSD", "MIT", "Apache"],
  //   // 默认值
  //   default: "MIT",
  // });
  // getSpinner(projectName, license);
};

// inquirer
// 语法：
// - 1. inquirer.prompt(questions, answers) -> promise
// - 2.  inquirer.prompt({type, name, ....}) -> promise
// 官网：
// - https://github.com/SBoudrias/Inquirer.js

// ora
// 官网
// - https://github.com/sindresorhus/ora
