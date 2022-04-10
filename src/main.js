/* eslint-disable no-undef */

const { Command } = require("commander");
const program = new Command();

program.version("0.0.1").parse(process.argv); // process.argv就是用户在命令行中传入的参数

// program.parse()
// - 作用
//  - 用来处理参数，没有被使用的选项会存放在program.args数组中
//  - 该方法的参数是可选的，默认值为 process.argv
