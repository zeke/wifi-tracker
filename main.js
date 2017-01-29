const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const dataFile = path.join(app.getPath('userData'), 'networks.json')
const networks = fs.existsSync(dataFile) ? require(dataFile) : []
const names = networks.map(network => network.name)
let win = null

app.once('ready', function () {
  win = new BrowserWindow({
    show: true
  })

  win.loadURL(`file://${path.join(__dirname, 'index.html')}`)
})

ipcMain.on('list', (event, list) => {
  list.forEach(network => {
    if (!network || !network.name) return
    if (names.includes(network.name)) {
      console.log(`${network.name} (already exists)`)
      return
    }
    networks.push(network)
    names.push(network.name)
    console.log(network.name)
    fs.writeFileSync(dataFile, JSON.stringify(networks, null, 2))
  })
})
