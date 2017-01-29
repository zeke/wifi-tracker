process.env.GOOGLE_API_KEY = 'AIzaSyCVQFTQJORqTZQ05lzm4eNZhdbL2rPqq2g'
require('electron-debug')({showDevTools: true})
const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const dataFile = path.join(app.getPath('userData'), 'networks.json')
const networks = fs.existsSync(dataFile) ? require(dataFile) : []
const bssids = networks.map(network => network.bssid)
let win = null

app.once('ready', function () {
  win = new BrowserWindow({
    show: true
  })

  win.loadURL(`file://${path.join(__dirname, 'index.html')}`)
})

ipcMain.on('list', (event, list, position) => {
  list.forEach(network => {
    if (!network || !network.name) return
    if (bssids.includes(network.bssid)) {
      console.log(`${network.name} (already exists)`)
      return
    }
    network.position = position
    networks.push(network)
    bssids.push(network.bssid)
    console.log(network)
    fs.writeFileSync(dataFile, JSON.stringify(networks, null, 2))
  })
})
