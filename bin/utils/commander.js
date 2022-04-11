// console.log("7-cli");
// console.log(process.argv);

/* eslint-disable no-undef */
const { version } = require("./constant.js");
const { Command } = require("commander"); //  一个 nodejs 命令行解决方案的库
const inquirer = require("./inquirer");

// const creatProject = require("../../lib/index.js");

// const creatProject = require("..");
// 1. require(..)
// - 表示：加载默认文档，默认文档在 package.json 的 main 字段中指定
// 2.
// - 因为：package.json 中的 main 字段指定了项目的入口文件为 lib/index.js
// - 所以：require(..) 中引入的就是 lib/index.js 文件

const program = new Command();
// program.version(version).parse(process.argv); // process.argv是用户在命令行中传入的参数

program
  .command("create") // 命令
  .argument("<projectName>", "project name you want create") // 参数名 + 参数描述
  // .argument("<date>", "created project date")
  .action((projectName) => {
    // 输入命令后需要执行的回调函数
    // creatProject(projectName, date); // 处理函数
    inquirer(projectName);
  });

// 这里单独写是因为可以写很多 command
program.version(version).parse();

// 1
// program.command()
// - 作用：配置命令
// - 参数
//  - 第一个参数：表示命令的名称
//  - 后面的参数：表示命令的参数，除了跟在第一个参数后面，也可以使用 .argument()单独指定

// 2
// program.argument(参数名，参数描述)
// - 表示：命令的参数
// - 参数
//  - 第一个参数：表示参数名
//    - <> 必选参数
//    - [] 可选参数
//    - ... 在参数名后面加上 ... 表示可变参数
//  - 第二个参数：表示参数描述
// ``` 可选参数示例
// program
//   .version('0.1.0')
//   .command('rmdir')
//   .argument('<dirs...>')
//   .action(function (dirs) {
//     dirs.forEach((dir) => {
//       console.log('rmdir %s', dir);
//     });
//   });
// ```

// 3
//  program.action((参数名) => { 输入命令后需要执行的代码 })

// 4
// program.parse()
// - 作用
//  - 用来处理参数，没有被使用的选项会存放在program.args数组中
//  - 该方法的参数是可选的，默认值为 process.argv

// 5
// program.alias 设置别名
// program.action 对命令进行处理

// 6
// process.argv
// - 返回一个数组
// - 第一个成员 -----> process.execPath，即Node的安装路径
// - 第二个成员 -----> 正在执行的JavaScript文件的路径
// - 其余成员 -------> 任何其他命令行参数

// 输入命令
// 1. seven-cli -V 会在命令行显示版本号
// 2. seven-cli create abc 会显示 [ '/usr/local/bin/node', '/usr/local/bin/seven-cli', 'create', 'abc' ]
// 3. ywz --help 出现帮助说明
