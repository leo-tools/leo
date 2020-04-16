const { execSync } = require('child_process')

exports.hasCommand = command => {
  try {
    execSync(command)
    return true
  } catch (e) {
    return false
  }
}
