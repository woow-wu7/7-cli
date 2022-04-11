/* eslint-disable no-undef */
const ora = require("ora");
const axios = require("axios");

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

const getRepositories = async (username) => {
  let { data } = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  return data.map((item) => item.name);
};

const fetchTagList = async (username, repoName) => {
  let { data } = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}/branches`
  );
  return data.map((item) => item.name);
};

module.exports = {
  loading,
  getRepositories,
  fetchTagList,
};
