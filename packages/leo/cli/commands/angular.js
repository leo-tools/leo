const inquirer = require('inquirer')
const chalk = require('chalk')
const { run } = require('../utils/runCommand')
const { clearConsole } = require('../utils/logger')
const { failSpinner } = require('../utils/spinner')
const { stopSpinner } = require('../utils/spinner')
const { logWithSpinner } = require('../utils/spinner')
const { hasCommand } = require('../utils/confirmCommand')

async function initAngular (projectName, targetDir) {
  if (!hasCommand('ng --version')) {
    await run('npm', ['install', '@angular/cli', '-g'])
  }

  const { hasRouting, stylesheet } = await inquirer.prompt([
    {
      type: 'confirm',
      message: ' Would you like to add Angular routing?',
      name: 'hasRouting',
      default: true
    },
    {
      type: 'list',
      message: ' Which stylesheet format would you like to use?',
      name: 'stylesheet',
      choices: [
        {
          name: 'CSS',
          value: 'css'
        },
        {
          name: 'Scss',
          value: 'scss'
        },
        {
          name: 'Sass',
          value: 'sass'
        },
        {
          name: 'Less',
          value: 'less'
        },
        {
          name: 'Stylus',
          value: 'styl'
        }
      ],
      default: 'scss'
    }
  ])

  await clearConsole()
  logWithSpinner(`Creating an Angular project in ${chalk.yellow(targetDir + 'by leo')} . \n`)
  try {
    await run('ng', ['new', projectName, `--routing=${hasRouting}`, `--style=${stylesheet}`])
    stopSpinner()
  } catch (e) {
    failSpinner(chalk.red(e.stderr))
  }
}

module.exports = {
  initAngular
}
