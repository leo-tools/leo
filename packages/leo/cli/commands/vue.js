const execa = require('execa')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { failSpinner } = require('../utils/spinner')
const { stopSpinner } = require('../utils/spinner')
const { logWithSpinner } = require('../utils/spinner')
const { clearConsole } = require('../utils/logger')
const { run } = require('../utils/runCommand')
const { hasCommand } = require('../utils/confirmCommand')

async function initVue (projectName) {
  if (!hasCommand('vue --version')) {
    await run('npm', ['install', '@vue/cli', '-g'])
  }

  const { isRecommendSetting } = await inquirer.prompt([
    {
      type: 'confirm',
      message: ' Would you like to use recommend settings for vue project ?',
      name: 'isRecommendSetting',
      default: true
    }
  ])

  await clearConsole()
  logWithSpinner(`Creating an Vue project by ${chalk.yellow('leo')} . \n`)
  try {
    if (!isRecommendSetting) {
      const child = execa('vue', ['create', projectName])
      child.stdout.on('data', buffer => {
        const str = buffer.toString().trim()
        console.log(str)
      })
    } else {
      await run('vue', ['create', '--preset', 'leo-tools/vue-cli-preset', projectName])
    }
    stopSpinner()
  } catch (e) {
    failSpinner(chalk.red(e.stderr))
  }
}

module.exports = {
  initVue
}
