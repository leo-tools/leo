const commander = require('commander')
const minimist = require('minimist')
const chalk = require('chalk')

const { version } = require('./commands/version')

commander
  .version(`leo ${version}`)
  .usage('<command> [options]')

commander
  .command('create <app-name>')
  .description('create a new project powered by leo')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)

    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
    }
    require('./commands/create')(name, options)
  })

commander.parse(process.argv)

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
