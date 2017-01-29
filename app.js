const wifi = require('wifi-list')
const path = require('path')
const {ipcRenderer, remote} = require('electron')

function getWifiList() {
  navigator.geolocation.getCurrentPosition((position) => {
    wifi(function (err, list) {
      if (err) {
        ipcRenderer.send('error', err)
      } else {
        ipcRenderer.send('list', list, position)
      }
    })
  })
}

setInterval(getWifiList, 15 * 1000)
