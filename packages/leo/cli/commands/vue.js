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

  const { isDefault } = await inquirer.prompt([
    {
      type: 'confirm',
      message: ' Would you like to use recommend settings for vue project ?',
      name: 'isDefault',
      default: true
    }
  ])

  await clearConsole()
  logWithSpinner(`Creating an Vue project by ${chalk.yellow('leo')} . \n`)
  try {
    if (isDefault) {
      await run('vue', ['create', '--preset', 'leo-tools/vue-cli-preset', projectName])
    } else {
      await run('vue', ['create', '--default', projectName])
    }
    stopSpinner()
  } catch (e) {
    failSpinner(chalk.red(e.stderr))
  }
}

module.exports = {
  initVue
}
