const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const configPath = path.resolve(__dirname, './config.json')

let config = null;

function loadConfig() {
  const data = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(data);
}

function getKey(key) {
  if (!config) {
    loadConfig();
  }
  return config[key];
}

function getNewKey(key) {
  if (!config) {
    loadConfig();
  }
  config[key] = uuidv4();
  fs.writeFileSync(configPath, JSON.stringify(config));
  return config[key];
}

module.exports = {
  getKey,
  getNewKey
};