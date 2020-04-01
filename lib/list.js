const request = require('request');
const chalk = require('chalk')
const ora = require('ora')
module.exports = () => {
  let spinner = ora('\n ' + chalk.yellow('正在查询模版列表，请等待...'));
  spinner.start();
  request({
    url: 'https://api.github.com/users/bobo-cli/repos',
    headers: {
      'User-Agent': 'bobo-cli'
    }
  }, (err, res, body) => {
    spinner.stop();
    if (err) {
      console.log(chalk.red('查询模版列表失败'))
      console.log(chalk.red(err))
      process.exit();
    }
    const requestBody = JSON.parse(body)
    if (Array.isArray(requestBody)) {
      console.log(chalk.green('可用的模版列表：'))
      requestBody.forEach(repo => {
        console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(repo.name) +
        ' - ' + repo.description)
      })
    } else {
      console.error(requestBody.message)
    }
  })
}