/* eslint-disable no-undef */
const ora = require("ora");
const axios = require("axios");
const path = require("path");
const { existsSync } = require("fs");
const { promisify } = require("util");
const downloadGitRepo = require("download-git-repo");

// loading
const loading =
  (asyncFn) =>
  async (...params) => {
    try {
      let spinner = ora("start...").start();
      let res = await asyncFn(...params);
      spinner.succeed("success");
      return res;
    } catch (error) {
      return error;
    }
  };

// 获取仓库
const getRepositories = async (username) => {
  let { data } = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  return data.map((item) => item.name);
};

// 获取分支
const fetchTagList = async (username, repoName) => {
  let { data } = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}/branches`
  );
  return data.map((item) => item.name);
};

// 下载函数
const download = promisify(downloadGitRepo);

// 下载 github 代码
/**
 * @description: 获取github仓库代码
 * @param {string} username 用户名
 * @param {string} repoName 仓库名
 * @return {string} destination 模版代码存储的本地文件夹
 */
const downloadFromGithub = async (username, repoName) => {
  console.log("username", username);
  console.log("repoName", repoName);

  // 生成缓存的文件夹
  // const cacheDir = `${
  //   process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
  // }/.tmp`;

  let url = `${username}/${repoName}`;

  // github项目下载到本地的文件夹
  let destination = path.join(
    process.cwd(),
    `${repoName.replace(/(#.*)/g, "")}`
  );

  // fs 模块提供的 existsSync 方法用于判断目录是否存在，如果存在，说明无需下载
  let flag = existsSync(destination);
  if (!flag) {
    // 需要下载 则执行下载
    console.log("开始下载模版");
    await loading(download)(url, destination);
    console.log("模版下载成功");
  }

  return destination;
};

module.exports = {
  loading,
  getRepositories,
  fetchTagList,
  downloadFromGithub,
};

// download-git-repo
// - 作用：下载并提取Git存储库，比如github，gitlab
// - 前置知识
//   - 1. `util.promisify(original)`
//     - 作用：采用遵循常见的错误优先的回调风格的函数（也就是将 `(err, value) => ...` 回调作为最后一个参数），并返回一个返回 promise 的版本
//     - 返回值： promise，即将函数包装成promise返回
//   - 2. `process.platform`
//     - 作用：判断代码运行的平台
//     - 不同平台
//       - darwin 是mac平台
//       - win32 是windows平台
//   - 3. fs.existsSync(path)
//     - 作用：如果路径存在则返回 `true`，否则返回 `false`
//   - 4. process.cwd()
//     - 作用：返回当前的工作目录
// - 示例
// download(
//   "bitbucket:flipxfx/download-bitbucket-repo-fixture#my-branch",
//   "test/tmp",
//   { clone: true },
//   function (err) {}
// );
