const { run } = require('../utils/runCommand')
const { hasCommand } = require('../utils/confirmCommand')

async function initVue (projectName) {
  if (!hasCommand('vue --version')) {
    await run('npm', ['install', '@vue/cli', '-g'])
  }
}

module.exports = {
  initVue
}
