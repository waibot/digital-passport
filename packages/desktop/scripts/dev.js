/* eslint-disable no-plusplus */
const path = require('path');
const { exec, execSync, spawnSync } = require('child_process');

const launchElectron = process.env.LAUNCH_ELECTRON === 'true';
const projectRoot = path.join(__dirname, '..');
const env = { ...process.env };
if (parseInt(process.version.split('.')[0].replace('v', ''), 10) > 17) {
  delete env.NODE_OPTIONS;
}

const id = setInterval(checkPort, 1000);

function checkPort() {
  try {
    const status = execSync('lsof -i:3001', {});
    if (!status) return;
  } catch (e) {
    return;
  }

  execSync('yarn run dev:main', {
    cwd: projectRoot,
    stdio: 'inherit',
    env,
  });
  clearInterval(id);
}
