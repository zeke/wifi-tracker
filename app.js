const wifi = require('wifi-list')
const path = require('path')
const geopositionToObect = require('geoposition-to-object')
const {ipcRenderer, remote} = require('electron')

function check () {
  console.log('check')
  navigator.geolocation.getCurrentPosition(getList, positionError)
}

function positionError (err) {
  console.error(err)
  ipcRenderer.send('error', err)
}

function getList (position) {
  console.log('getList', position)
  wifi(function (err, list) {
    if (err) {
      console.error(err)
      ipcRenderer.send('error', err)
    } else {
      ipcRenderer.send('list', list, geopositionToObect(position))
    }
  })
}

check()
setInterval(check, 15 * 1000)
