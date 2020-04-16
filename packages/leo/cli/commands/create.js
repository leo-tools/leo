const path = require('path')
const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk')
const inquirer = require('inquirer')
const execa = require('execa')
const { initVue } = require('./vue')
const { initAngular } = require('./angular')

module.exports = async function create (projectName, options) {
  const cwd = options.cwd || process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }

  const { framework } = await inquirer
    .prompt([
      {
        type: 'list',
        message: ' Which framework or library do you use?',
        name: 'framework',
        choices: [
          {
            name: 'Angular'
          },
          {
            name: 'Vue'
          }

        ],
        default: 'Angular'
      }
    ])

  switch (framework) {
    case 'Angular':
      await initAngular(projectName)
      break
    case 'Vue':
      await initVue(projectName)
      break
  }
}
