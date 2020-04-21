const chalk = require('chalk')
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

  await clearConsole()
  logWithSpinner(`Creating an Vue project by ${chalk.yellow('leo')} . \n`)
  try {
    await run('vue', ['create', '--preset', 'leo-tools/vue-cli-preset', projectName])
    stopSpinner()
  } catch (e) {
    failSpinner(chalk.red(e.stderr))
  }
}

module.exports = {
  initVue
}
