const execa = require('execa')

exports.run = function (command, args) {
  if (!args) { [command, ...args] = command.split(/\s+/) }
  return execa(command, args, { cwd: this.context })
}
